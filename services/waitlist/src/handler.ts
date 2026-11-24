import type { WaitlistProvider } from './provider.ts';
import type { RateLimiter } from './rate-limit.ts';

export type WaitlistRequest = { rawBody: string | undefined; ip: string };
export type WaitlistResponse = { status: number; body: { ok: boolean; error?: string } };

const MAX_BODY_BYTES = 2_048;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL_RE.test(email);
}

/** Transport-agnostic waitlist logic shared by the Lambda and the local dev server. */
export async function handleWaitlist(
  req: WaitlistRequest,
  deps: { provider: WaitlistProvider; limiter: RateLimiter; now?: () => Date },
): Promise<WaitlistResponse> {
  if (!deps.limiter.allow(req.ip || 'unknown')) {
    return { status: 429, body: { ok: false, error: 'rate_limited' } };
  }

  if (!req.rawBody || Buffer.byteLength(req.rawBody) > MAX_BODY_BYTES) {
    return { status: 400, body: { ok: false, error: 'invalid_request' } };
  }

  let payload: unknown;
  try {
    payload = JSON.parse(req.rawBody);
  } catch {
    return { status: 400, body: { ok: false, error: 'invalid_request' } };
  }
  if (typeof payload !== 'object' || payload === null) {
    return { status: 400, body: { ok: false, error: 'invalid_request' } };
  }

  const { email, company } = payload as { email?: unknown; company?: unknown };

  // Honeypot filled: pretend it worked, store nothing.
  if (typeof company === 'string' && company.trim() !== '') {
    return { status: 200, body: { ok: true } };
  }

  const normalised = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!isValidEmail(normalised)) {
    return { status: 400, body: { ok: false, error: 'invalid_email' } };
  }

  try {
    await deps.provider.add({ email: normalised, createdAt: (deps.now?.() ?? new Date()).toISOString() });
  } catch (err) {
    console.error('waitlist_provider_error', err);
    return { status: 500, body: { ok: false, error: 'server_error' } };
  }
  return { status: 200, body: { ok: true } };
}
