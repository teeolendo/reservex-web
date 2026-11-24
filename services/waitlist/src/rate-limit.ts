/**
 * Fixed-window, in-memory rate limiter keyed by client IP.
 *
 * Best effort only: each Lambda instance keeps its own counts, so the real
 * limit scales with concurrency. Pair it with an AWS WAF rate-based rule in
 * production.
 */
export class RateLimiter {
  private hits = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly limit = 5,
    private readonly windowMs = 60_000,
  ) {}

  /** Records an attempt. Returns false if the key is over the limit. */
  allow(key: string, now = Date.now()): boolean {
    if (this.hits.size > 10_000) this.prune(now);
    const entry = this.hits.get(key);
    if (!entry || entry.resetAt <= now) {
      this.hits.set(key, { count: 1, resetAt: now + this.windowMs });
      return true;
    }
    entry.count += 1;
    return entry.count <= this.limit;
  }

  private prune(now: number) {
    for (const [key, entry] of this.hits) if (entry.resetAt <= now) this.hits.delete(key);
  }
}
