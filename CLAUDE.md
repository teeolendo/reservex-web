# CLAUDE.md

Marketing sites for ReserveX: **ReserveX Trader** (main domain) and **ReserveX tokenisation** (subdomain).

**Start by reading `HANDOFF.md` in full.** It is the spec. The visual and copy references are in `design/`.

## Ground rules
- Build to the designs exactly: copy word for word, tokens as specified. Don't invent new sections or rewrite copy.
- `design/*.dc.html` are references only. They need a canvas runtime that isn't here. Rebuild them as React components; never import or serve them.
- Stack: pnpm + Turborepo, Next.js 14 App Router, TypeScript, Tailwind, next/font.
- British English.
- **Trader site:** zero crypto or virtual-asset vocabulary (token, blockchain, onchain, crypto, virtual asset, tokenisation). Enforce it with a CI grep.
- **Tokenisation site:** zero third-party company names.
- Never imply ReserveX holds client money. Never claim the Token Issuance Platform licence is granted.
- Leave `[PLACEHOLDER]` values in place and list them in the PR. Ask before deciding the hosting target or the waitlist provider.
- Build in small, reviewable steps: monorepo scaffold → shared `packages/ui` and tokens → Trader page → tokenisation page → waitlist → metadata/OG → CI checks.
