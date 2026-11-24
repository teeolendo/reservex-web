import assert from 'node:assert/strict';
import { test } from 'node:test';
import { handleWaitlist, isValidEmail } from './handler.ts';
import type { WaitlistEntry, WaitlistProvider } from './provider.ts';
import { RateLimiter } from './rate-limit.ts';

class MemoryProvider implements WaitlistProvider {
  entries: WaitlistEntry[] = [];
  async add(e: WaitlistEntry) {
    this.entries.push(e);
  }
}

const setup = (limit = 5) => {
  const provider = new MemoryProvider();
  return { provider, deps: { provider, limiter: new RateLimiter(limit), now: () => new Date('2026-11-24T00:00:00Z') } };
};
const body = (o: unknown) => JSON.stringify(o);

test('accepts a valid email and stores it normalised', async () => {
  const { provider, deps } = setup();
  const res = await handleWaitlist({ rawBody: body({ email: '  Ada@Example.com ', company: '' }), ip: '1.1.1.1' }, deps);
  assert.equal(res.status, 200);
  assert.deepEqual(provider.entries, [{ email: 'ada@example.com', createdAt: '2026-11-24T00:00:00.000Z' }]);
});

test('rejects an invalid email', async () => {
  const { provider, deps } = setup();
  const res = await handleWaitlist({ rawBody: body({ email: 'not-an-email' }), ip: '1.1.1.1' }, deps);
  assert.equal(res.status, 400);
  assert.equal(res.body.error, 'invalid_email');
  assert.equal(provider.entries.length, 0);
});

test('rejects malformed, empty and oversized bodies', async () => {
  const { deps } = setup(100);
  for (const rawBody of [undefined, '', '{', 'null', 'x'.repeat(3000)]) {
    const res = await handleWaitlist({ rawBody, ip: '1.1.1.1' }, deps);
    assert.equal(res.status, 400, `body: ${String(rawBody).slice(0, 10)}`);
  }
});

test('honeypot returns 200 but stores nothing', async () => {
  const { provider, deps } = setup();
  const res = await handleWaitlist({ rawBody: body({ email: 'bot@example.com', company: 'Acme' }), ip: '1.1.1.1' }, deps);
  assert.equal(res.status, 200);
  assert.equal(provider.entries.length, 0);
});

test('rate limits per IP', async () => {
  const { deps } = setup(2);
  const req = (ip: string) => handleWaitlist({ rawBody: body({ email: 'a@b.co' }), ip }, deps);
  assert.equal((await req('9.9.9.9')).status, 200);
  assert.equal((await req('9.9.9.9')).status, 200);
  assert.equal((await req('9.9.9.9')).status, 429);
  assert.equal((await req('8.8.8.8')).status, 200);
});

test('rate limit window resets', () => {
  const limiter = new RateLimiter(1, 1000);
  assert.equal(limiter.allow('k', 0), true);
  assert.equal(limiter.allow('k', 500), false);
  assert.equal(limiter.allow('k', 1000), true);
});

test('provider failure returns 500', async () => {
  const deps = {
    provider: { add: async () => Promise.reject(new Error('down')) },
    limiter: new RateLimiter(),
  };
  const orig = console.error;
  console.error = () => {};
  const res = await handleWaitlist({ rawBody: body({ email: 'a@b.co' }), ip: '1' }, deps);
  console.error = orig;
  assert.equal(res.status, 500);
});

test('isValidEmail', () => {
  assert.ok(isValidEmail('a@b.co'));
  assert.ok(!isValidEmail('a@b'));
  assert.ok(!isValidEmail('a b@c.co'));
  assert.ok(!isValidEmail(`${'a'.repeat(250)}@b.co`));
});
