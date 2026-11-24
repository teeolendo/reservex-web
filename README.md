# reservex-web

Marketing sites for ReserveX.

| Site | App | Domain | Design |
|---|---|---|---|
| ReserveX Trader: the front door to Kenya’s capital markets | `apps/trader` | `reservexlabs.com` | `design/trader-home.dc.html` |
| ReserveX: tokenising African capital markets | `apps/labs` | `[LABS_SUBDOMAIN]` | `design/reservex-tokenisation.dc.html` |

- Spec: [`HANDOFF.md`](./HANDOFF.md)
- Agent instructions: [`CLAUDE.md`](./CLAUDE.md)
- Deployment (AWS S3 + CloudFront + Lambda): [`docs/DEPLOY.md`](./docs/DEPLOY.md)

## Layout

```
apps/trader        Next.js 14 static site: ReserveX Trader (+ waitlist form)
apps/labs          Next.js 14 static site: ReserveX tokenisation
packages/ui        Shared Tailwind preset (design tokens), fonts, Nav, Footer, Button, Card, …
services/waitlist  Waitlist API: provider interface + AWS Lambda handler + local dev server
scripts/           CI content and copy checks
design/            Approved design references (never imported or served)
```

## Develop

Requires Node 20+ and pnpm 10.

```sh
pnpm install
pnpm dev          # trader :3000, labs :3001, waitlist API :3100 (proxied at /api/waitlist)
```

## Check and build

```sh
pnpm typecheck && pnpm lint && pnpm test
pnpm build        # static output in apps/*/out, Lambda bundle in services/waitlist/dist
pnpm check        # content rules (HANDOFF §6) + word-for-word copy check against design/
```

## Environment

| Variable | Used by | Purpose |
|---|---|---|
| `NEXT_PUBLIC_TRADER_URL` | both | Absolute Trader URL (cross-site links, metadata) |
| `NEXT_PUBLIC_LABS_URL` | both | Absolute tokenisation URL |
| `NEXT_PUBLIC_WAITLIST_ENDPOINT` | trader | Waitlist API URL. Defaults to same-origin `/api/waitlist` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | labs | “Book a conversation” mailto address |
| `WAITLIST_ALLOWED_ORIGINS` | Lambda | CORS allow-list. Only needed if the API is on another origin |

See `apps/*/.env.example`. Local values are in `apps/*/.env.development`.
