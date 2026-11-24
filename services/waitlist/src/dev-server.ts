// Local stand-in for the Lambda, used by `pnpm dev`. Next's dev server proxies /api/waitlist here.
import { createServer } from 'node:http';
import { handleWaitlist } from './handler.ts';
import { LogProvider } from './provider.ts';
import { RateLimiter } from './rate-limit.ts';

const PORT = Number(process.env.WAITLIST_DEV_PORT ?? 3100);
const provider = new LogProvider();
const limiter = new RateLimiter();

createServer(async (req, res) => {
  if (req.url !== '/api/waitlist' || req.method !== 'POST') {
    res.writeHead(404).end();
    return;
  }
  let raw = '';
  for await (const chunk of req) raw += chunk;
  const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() || req.socket.remoteAddress || '';
  const out = await handleWaitlist({ rawBody: raw, ip }, { provider, limiter });
  res.writeHead(out.status, { 'Content-Type': 'application/json' }).end(JSON.stringify(out.body));
}).listen(PORT, '127.0.0.1', () => console.log(`waitlist dev server on http://127.0.0.1:${PORT}/api/waitlist`));
