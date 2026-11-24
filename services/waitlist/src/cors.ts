/**
 * Allowed browser origins, from WAITLIST_ALLOWED_ORIGINS (comma-separated).
 * Not needed when CloudFront serves the site and /api/* from one origin.
 */
export function corsHeaders(origin: string | undefined): Record<string, string> {
  const allowed = (process.env.WAITLIST_ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  if (!origin || !allowed.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}
