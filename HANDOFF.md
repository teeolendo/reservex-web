# ReserveX Web — Build Handoff

This repo holds the approved designs for two marketing sites. Your job is to build them as production Next.js sites that match the designs in `design/` exactly: same copy, layout, spacing and colours.

---

## 1. What we're building

| Site | Audience | Domain | Design file |
|---|---|---|---|
| **ReserveX Trader** | Retail investors, mainly the Kenyan diaspora | Main domain: `[DOMAIN]` | `design/trader-home.dc.html` |
| **ReserveX tokenisation** | Traditional fund managers, issuers, banks, exchanges | Subdomain: `[LABS_SUBDOMAIN]` | `design/reservex-tokenisation.dc.html` |

Each site is a single long landing page with in-page anchor navigation. They cross-link to each other in the nav, the closing call to action and the footer.

**ReserveX Trader** is a CMA-licensed (Intermediary Service Platform Provider) app. It is the front door to Kenya's capital markets: MMFs, unit trusts/CIS, ETFs, REITs, government bonds and live NSE stocks. It launches in Q1 2027, so the site's only working feature is a **waitlist form**.

**ReserveX tokenisation** pitches ReserveX as the full-service tokenisation partner for African capital markets (Token Issuance Platform Provider): advisory, structuring, licensing, engineering, distribution, liquidity and ongoing operations, delivered by one team.

---

## 2. Stack

Match the rest of the ReserveX stack:

- **pnpm + Turborepo** monorepo
  - `apps/trader`: Next.js 14 (App Router)
  - `apps/labs`: Next.js 14 (App Router)
  - `packages/ui`: shared tokens, layout primitives, Nav, Footer, Button, Section, Eyebrow, Card
- **TypeScript**, **Tailwind CSS** with the design tokens below set in a shared Tailwind preset
- **next/font** for Newsreader and Inter (self-hosted, no runtime Google Fonts request)
- Fully static (`output: 'export'` or SSG). The waitlist submission is the only dynamic piece (see §7).
- Hosting target: **[TBD: confirm with Tony]**. Keep it portable; don't use host-specific APIs.

---

## 3. How to read the design files

The `design/*.dc.html` files were exported from a design canvas. **Use them as the visual and copy reference. Do not ship them.** They need a canvas runtime (`./support.js`) that is not in this repo.

- All styling is inline `style="…"`. Turn it into Tailwind classes and tokens. Keep the values; don't round them.
- `{{accent}}` is a themeable accent colour. Implement it as the CSS variable `--accent` (default `#F4C25B`).
- `<x-dc>`, `<helmet>`, `<sc-if>` and the `<script type="text/x-dc">` block are canvas syntax:
  - `<helmet>` holds the font link and hover styles.
  - `<sc-if>` is a conditional render (used for the waitlist's before and after states).
  - Ignore `data-props` and `$preview`.
- `href="Tokenization.dc.html"` and `href="Main.dc.html"` are cross-site links. Replace them with absolute URLs to the other domain (from env vars `NEXT_PUBLIC_TRADER_URL` and `NEXT_PUBLIC_LABS_URL`).
- **Copy every piece of text exactly, punctuation included.** Curly apostrophes (’), middle dots (·) and British spelling are deliberate.

---

## 4. Design tokens

### Colour
| Token | Hex | Use |
|---|---|---|
| `brand` | `#14543C` | ViFi forest green: primary buttons, eyebrows, accents, dark panels |
| `brand-hover` | `#0C3B29` | Primary button and link hover |
| `ink` | `#10241B` | Headings, body text on white |
| `ink-soft` | `#2A3A32` | Body text on the accent-coloured card |
| `muted` | `#3E5249` | Paragraph text |
| `subtle` | `#5B6E65` | Small print, captions, footer text |
| `mint` | `#1F9D6B` | Icon strokes, status dots (decorative only, never text) |
| `positive` | `#1A7A54` | Positive figures in mockups |
| `tint` | `#EEF6F1` | Icon tiles, chips, step cards |
| `wash` | `#F6FAF8` | Alternating section background |
| `line` | `#EDF2EF` | Hairline dividers |
| `border` | `#E3ECE7` | Card borders |
| `border-strong` | `#CFE3D8` | Ghost button and input borders |
| `border-hover` | `#B9D6C6` | Card border on hover |
| `on-brand` | `#FFFFFF` | Text on green |
| `on-brand-muted` | `#D7E8DF` | Body text on green |
| `on-brand-subtle` | `#BFD8CC` | Eyebrows on green |
| `accent` | `#F4C25B` (CSS var) | Decorative circles, the "Flagship" pill, highlight card |

Page background is pure white `#FFFFFF`.

### Type
- **Display:** Newsreader 400/500 (optical sizing). Use it for h1, h2, big numbers and phase names.
- **Body/UI:** Inter 400/500/600.
- h1: `clamp(48px, 6vw, 80px)` on Trader, `clamp(52px, 6.6vw, 92px)` on the tokenisation page. line-height ~1, letter-spacing −0.025 to −0.03em.
- h2: `clamp(34–38px, ~4vw, 48–62px)` (exact values per section are in the files). letter-spacing −0.02em.
- Eyebrows: 14px / 600 / uppercase / letter-spacing 0.08em / `brand`.
- Lead paragraph 18–20px, body 15–17px, line-height 1.6–1.7.

### Layout and shape
- Content container: `max-width: 1200px`, horizontal padding 32px.
- Section vertical rhythm: **144px** top and bottom for major sections (generous white space is the point of the design).
- Radius: buttons and pills `999px`; cards 24px; large cards 28px; feature panels 36px; icon tiles 14px.
- Cards: 1px `border` with no shadow. Hero mockups have one soft shadow: `0 30px 60px -30px rgba(16,36,27,0.25)`.
- Layout uses flex-wrap with flex-basis (e.g. `flex: 1 1 340px`), so grids reflow naturally on mobile. Keep that behaviour; a Tailwind grid with responsive columns is fine.
- Minimum tap target 44px; primary buttons are 52px high in the hero.

---

## 5. Page inventory

### ReserveX Trader (`apps/trader`)
1. **Nav**: wordmark + links (Products, How it works, Safety, Fees, ReserveX Labs → labs site) + "Join the waitlist" CTA
2. **Hero** `#top`: CMA licence pill, h1 "The front door to Kenya’s capital markets.", lead text, two CTAs, launch line. The phone portfolio mockup on the right is static and illustrative: build it in HTML/CSS, not as an image.
3. **Trust strip**: 4 icon facts
4. **Why we built it**
5. **Products** `#products`: 6 cards
6. **Built for life abroad**: 6 numbered features on the `wash` background
7. **How it works** `#how`: 3 step cards (the third uses `--accent`)
8. **Safety** `#safety`: dark green panel, 3 sub-cards
9. **Fees** `#fees`: "Invest $100. Your fund gets $100." with a fee table
10. **Waitlist** `#waitlist`: email form → success state (see §7)
11. **Footer** with regulatory disclosure

### ReserveX tokenisation (`apps/labs`)
1. **Nav**: wordmark "ReserveX" + links (Why tokenise, What we do, How we deliver, Assets, Team, ReserveX Trader → trader site) + "Start a conversation" CTA
2. **Hero** `#top`: "Token Issuance Platform Provider" pill, h1 "Tokenising African capital markets.", the "One partner · The whole stack" card (6 layers)
3. **Statement strip**
4. **Why tokenise** `#why`: problem text + 4 stats + source line
5. **Before/after table**: a real `<table>` that scrolls horizontally on mobile
6. **What we do** `#services`: 6 service cards on `wash`
7. **How we deliver** `#programme`: 4 phase cards; the last one is dark green. **No durations or timelines are shown; this is intentional.**
8. **Beyond speed**: dark green panel, 6 benefits
9. **What we tokenise** `#assets`: 4 cards
10. **Why now + Safeguards**: two columns on `wash`
11. **Team** `#team`: 3 cards
12. **Contact** `#contact`: dark green CTA panel
13. **Footer** with disclosure

---

## 6. Non-negotiable content rules

These come from regulatory positioning. Don't "improve" copy in ways that break them.

1. **No crypto or virtual-asset language on the Trader site.** No "token", "blockchain", "onchain", "crypto", "virtual asset" or "tokenisation", anywhere: copy, metadata, alt text, OG tags or code comments that ship. The nav link to the other site reads **"ReserveX Labs"** only.
2. **No third-party company names on the tokenisation site.** That covers partners, competitors, banks, chains and research firms. Stats are attributed to "Industry estimates, 2025" only.
3. **Non-custodial framing everywhere:** ReserveX never holds client money. Don't write copy that implies otherwise.
4. **Don't claim the Token Issuance Platform licence has been granted.** The disclosure wording ("subject to the applicable licensing in each market") stays as written until Tony confirms otherwise.
5. **British English** throughout (tokenise, licence as the noun, programme, centre).
6. The Trader hero figures (KES 1,248,300 etc.) are **illustrative**. Keep them as a static mockup and never wire them to data.

---

## 7. Waitlist form (Trader only)

- Fields: email (required, `type="email"`, visible label "Email address").
- On submit: validate, POST to a Next.js route handler `/api/waitlist`, then swap the form for the success line: "You’re on the list. We’ll be in touch before launch."
- Storage/provider: **[TBD: confirm with Tony]**. Put it behind an interface so the provider is one adapter. Until confirmed, log server-side and return 200.
- Add a honeypot field and basic rate limiting. Show an inline error state in the same visual language (no browser alerts).
- If the site goes fully static, the route handler moves to a small serverless function. Document whichever approach you take.

The tokenisation site's "Book a conversation" button is a `mailto:` to `[CONTACT_EMAIL]` for now.

---

## 8. Placeholders still to fill

Leave these as obvious placeholders and list them in the PR description:

| Placeholder | Where |
|---|---|
| `[DOMAIN]`, `[LABS_SUBDOMAIN]` | Env and config |
| `[LICENCE NO.]` | Trader footer disclosure |
| `[SHORT BIO]` | Clyde Mutsotso, CFO, tokenisation team section |
| `[CONTACT EMAIL]` | Tokenisation contact CTA |
| Waitlist provider | §7 |
| Hosting target | §2 |

---

## 9. Also do

- **Metadata:** use each design file's `<title>`; write a meta description from the hero lead text; add OG and Twitter cards (simple text-on-green OG image, generated with `next/og`); favicon from the "X" mark (green rounded square, white Newsreader X).
- **Accessibility:** keep the semantic structure from the designs (`<nav>`, `<section>`, real `<table>`, `<ol>` for steps, `aria-hidden` on decorative SVGs and blobs, `role="img"` + `aria-label` on the two hero mockups). Visible focus rings in `brand`. Smooth-scroll for anchors, respecting `prefers-reduced-motion`.
- **Performance:** no client JS beyond the waitlist form and mobile nav. Target Lighthouse 95+ on all four scores.
- **Mobile nav:** the design's nav wraps. At phone width, replace it with a simple menu button and sheet using the same links.

---

## 10. Done when

- [ ] Both apps build and run (`pnpm dev`, `pnpm build`)
- [ ] Each page matches its design file at 1440px and holds up at 390px
- [ ] All copy matches the design files word for word
- [ ] The §6 rules pass. Add a CI check that greps the built Trader output for banned words: `token|blockchain|onchain|crypto|virtual asset`
- [ ] Waitlist works end to end, with success and error states
- [ ] Cross-site links use the env URLs
- [ ] Placeholders listed in the PR
