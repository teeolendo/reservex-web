# Deploying ReserveX Web (AWS)

Hosting target: **AWS**. Both sites are fully static exports served from S3 through CloudFront. The Trader waitlist is the only dynamic piece: a small Lambda behind the same CloudFront distribution.

```
                    ┌──────────── CloudFront: reservexlabs.com ──────┐
  browser ─────────▶│  default (*)   → S3 bucket  (apps/trader/out)  │
                    │  /api/*        → Lambda function URL (waitlist)│
                    └────────────────────────────────────────────────┘

                    ┌──────── CloudFront: [LABS_SUBDOMAIN] ─────────┐
  browser ─────────▶│  default (*)   → S3 bucket  (apps/labs/out)    │
                    └────────────────────────────────────────────────┘
```

Nothing in the code is AWS-specific except `services/waitlist/src/lambda.ts`, a thin adapter over the transport-agnostic `handleWaitlist()`. Moving host means writing another adapter of about 20 lines.

## 1. Build

```sh
pnpm install --frozen-lockfile
NEXT_PUBLIC_TRADER_URL=https://reservexlabs.com \
NEXT_PUBLIC_LABS_URL=https://[LABS_SUBDOMAIN] \
NEXT_PUBLIC_CONTACT_EMAIL='info@reservexlabs.com' \
pnpm build
```

Outputs:

| Path | What |
|---|---|
| `apps/trader/out/` | Trader static site |
| `apps/labs/out/` | Tokenisation static site |
| `services/waitlist/dist/index.mjs` | Waitlist Lambda bundle (Node 20+, ESM, handler `index.handler`) |

`NEXT_PUBLIC_*` values are inlined at build time, so build once per environment.

## 2. Static sites (S3 + CloudFront)

For each site:

1. Create a private S3 bucket (block all public access).
2. Create a CloudFront distribution with the bucket as origin using **Origin Access Control**. Set the default root object to `index.html`.
3. Custom error response: 404 → `/404.html`, status 404.
4. Attach the ACM certificate (in `us-east-1`) for the domain, and point DNS at the distribution.
5. Upload:
   ```sh
   aws s3 sync apps/trader/out s3://<trader-bucket> --delete \
     --cache-control "public,max-age=300" --exclude "_next/static/*"
   aws s3 sync apps/trader/out/_next/static s3://<trader-bucket>/_next/static \
     --cache-control "public,max-age=31536000,immutable"
   # Metadata images are exported without a file extension; set their type explicitly.
   for f in opengraph-image twitter-image icon apple-icon; do
     aws s3 cp apps/trader/out/$f s3://<trader-bucket>/$f \
       --content-type image/png --cache-control "public,max-age=86400"
   done
   aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
   ```
   (Same for `apps/labs/out`.)

Recommended response headers policy: HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`.

## 3. Waitlist Lambda

1. Create a Lambda function: runtime Node.js 20.x or later, handler `index.handler`, 128 MB, timeout 5 s. Upload `services/waitlist/dist/index.mjs` (zip it as `index.mjs`).
2. Enable a **function URL** (auth type `AWS_IAM`, invoked by CloudFront through OAC), or put it behind an API Gateway HTTP API. Both use payload format v2, which the handler expects.
3. On the **Trader** distribution, add an origin for the function URL and a cache behaviour:
   - Path pattern: `/api/*`
   - Allowed methods: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
   - Cache policy: `CachingDisabled`
   - Origin request policy: `AllViewerExceptHostHeader`

   The form posts to `/api/waitlist` on the same origin, so no CORS is needed and `NEXT_PUBLIC_WAITLIST_ENDPOINT` can stay unset.
4. If you serve the API from a different origin instead, set `NEXT_PUBLIC_WAITLIST_ENDPOINT` at build time to its full URL, and set `WAITLIST_ALLOWED_ORIGINS=https://reservexlabs.com` on the Lambda.

### Rate limiting

The Lambda applies a best-effort, in-memory limit of 5 requests per IP per minute. Counts are per warm instance, so **also add an AWS WAF rate-based rule** on the Trader distribution scoped to `/api/waitlist` (for example, 20 requests per 5 minutes per IP).

### Storage provider

**[TBD: waitlist provider]**. Sign-ups are currently only logged to CloudWatch (`{"event":"waitlist_signup",...}`) by `LogProvider`. To add real storage, implement `WaitlistProvider` in `services/waitlist/src/provider.ts` and swap it in `lambda.ts`.

Note: CloudWatch logs will hold email addresses. Set a short log retention until the real provider is in place.

## Local development

`pnpm dev` starts:

- Trader at http://localhost:3000
- Tokenisation at http://localhost:3001
- the waitlist dev server at http://127.0.0.1:3100 (Next's dev server proxies `/api/waitlist` to it)

Cross-site links use `.env.development` in each app.
