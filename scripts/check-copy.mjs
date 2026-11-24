#!/usr/bin/env node
// Verifies every visible text run in the design files appears verbatim
// (punctuation included) in the corresponding built page.
//
//   node scripts/check-copy.mjs
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const PAIRS = [
  { design: 'design/trader-home.dc.html', built: 'apps/trader/out/index.html' },
  { design: 'design/reservex-tokenisation.dc.html', built: 'apps/labs/out/index.html' },
];

// Copy changes approved by the product owner (2026-11-24), including the compliance review
// against the CMA Conduct of Business and Public Offers Regulations. Each maps the design's
// text run to what ships instead, or to null if it was removed.
const APPROVED_CHANGES = {
  'design/trader-home.dc.html': {
    // No CMA licence number to publish yet; offer and pre-launch wording added (compliance review).
    "ReserveX Labs Limited is licensed by the Capital Markets Authority of Kenya as an Intermediary Service Platform Provider (licence no. [LICENCE NO.]). ReserveX does not hold client funds and does not issue investment products; products are offered by their respective licensed managers and intermediaries. The value of investments can go down as well as up, and past performance is not a guide to future returns. © 2026 ReserveX Labs Limited.":
      "ReserveX Labs Limited is licensed by the Capital Markets Authority of Kenya as an Intermediary Service Platform Provider. ReserveX does not hold client funds and does not issue investment products; products are offered by their respective licensed managers and intermediaries. The value of investments can go down as well as up, and past performance is not a guide to future returns. Nothing on this site is an offer or solicitation to buy any investment product. Product availability, fees and features are subject to change before launch. © 2026 ReserveX Labs Limited.",
    // Compliance review (2026-11-24): charges disclosed per CMA Conduct of Business Regs r.8.
    "No hidden spreads, no exit penalties. Card processing is shown on top before you pay, so the full amount you choose goes to work.":
      "No exit penalties. The 0.50% contribution fee and any card processing are added on top and shown before you pay, so the full amount you choose goes to work. Exchange rates are shown before you confirm.",
    "Platform fee":
      "Platform fee (on your balance)",
    // No implied promise of a return (r.7(1)(c)).
    "Your cash, earning daily. Park it, sweep idle balances into it, withdraw when you need it.":
      "Daily-priced funds for your cash. Park it, sweep idle balances into it, withdraw when you need it. Returns are not guaranteed.",
    // Orders reach the NSE through a licensed stockbroker.
    "Real-time prices and direct orders into the Nairobi Securities Exchange order book. No phone calls.":
      "Real-time prices, with orders placed on the Nairobi Securities Exchange through a licensed stockbroker. No phone calls.",
    // Funds are not sovereign-backed; no income promise.
    "Kenyan Treasury exposure through regulated fixed income funds. Steady income, backed by the sovereign.":
      "Kenyan Treasury exposure through regulated fixed income funds, run by licensed managers.",
    // Recurring investing framed as client-set instructions while automated investing is confirmed with the regulator.
    "Set it and forget it":
      "Invest on your schedule",
    "Recurring contributions on your schedule. Name a goal (a home, school fees, retirement) and watch it fill up.":
      "Set up recurring contributions you choose and control: amount, date and products. Name a goal (a home, school fees, retirement) and track your progress.",
    "Reinvest automatically":
      "Choose to reinvest",
    "Dividends and distributions roll straight back in, so your returns earn returns.":
      "Opt in to roll dividends and distributions back into the same holding.",
    "Auto-invest":
      "Monthly plan",
    // Matches the client-funds position exactly (r.28–30).
    "We never touch your money. That’s the point.":
      "We never hold your money. That’s the point.",
    // Unsubstantiated comparative claim (r.6).
    "Bank-grade security":
      "Security built in",
  },
  'design/reservex-tokenisation.dc.html': {
    // CFO bio omitted until one is supplied.
    "[SHORT BIO]":
      null,
    // Compliance review (2026-11-24): licensed for ReserveX Trader only; TIP application lodged, not granted.
    "Token Issuance Platform Provider":
      "Token Issuance Platform licence: application lodged",
    "ReserveX Labs Limited is licensed by the Capital Markets Authority of Kenya as an Intermediary Service Platform Provider. Token issuance services are provided subject to the applicable licensing in each market. Figures marked as industry estimates are illustrative and not a forecast. Nothing on this page is an offer or solicitation to buy any security or virtual asset. © 2026 ReserveX Labs Limited.":
      "ReserveX Labs Limited is licensed by the Capital Markets Authority of Kenya as an Intermediary Service Platform Provider, for its ReserveX Trader platform only. It is not licensed as a Token Issuance Platform Provider or virtual asset service provider in Kenya or any other market. Its Token Issuance Platform application with the Capital Markets Authority is under review, and token issuance services will be provided only once the applicable licence is granted in each market. Figures marked as industry estimates are illustrative and not a forecast. Nothing on this page is an offer or solicitation to buy any security or virtual asset. © 2026 ReserveX Labs Limited.",
    // No current-tense claim to a service that needs a licence.
    "We act as your listing agent across licensed global venues: due diligence, disclosure, technical onboarding and launch. A new investor base, not just a new back office.":
      "Once licensed, we will act as your listing agent on licensed venues: due diligence, disclosure, technical onboarding and launch. A new investor base, not just a new back office.",
    // Market-making and lending by licensed third parties; no NAV-parity promise.
    "Market-making and lending arrangements in place so units trade at or near NAV from day one, and holders can borrow against them without redeeming.":
      "We line up licensed market makers and lenders so units can trade close to NAV and holders can borrow against them without redeeming.",
    "Holders pledge units and borrow against them, valued at official NAV. They stay invested; you keep the assets, the client and the fee, with no balance-sheet exposure.":
      "Holders pledge units and borrow against them through licensed lenders, valued at official NAV. They stay invested; you keep the assets, the client and the fee, with no balance-sheet exposure.",
    // Private offers can't be marketed publicly (Public Offers Regs r.17).
    "Private credit and alternative strategies, opened to a broader, verified investor base.":
      "Private credit and alternative strategies, opened to eligible, verified investors within the applicable offer rules.",
  },
};

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#x27': "'", '#39': "'" };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi, (m, e) => {
    if (ENTITIES[e.toLowerCase()] !== undefined) return ENTITIES[e.toLowerCase()];
    if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
    return m;
  });
const squash = (s) => s.replace(/\s+/g, ' ').trim();

function bodyOf(html) {
  return html
    .replace(/<head>[\s\S]*?<\/head>/i, '')
    .replace(/<helmet>[\s\S]*?<\/helmet>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

/** Text runs between tags. */
function runs(html) {
  return bodyOf(html)
    .split(/<[^>]+>/)
    .map((t) => squash(decode(t)))
    .filter((t) => t && !/^\{\{.*\}\}$/.test(t));
}

/** Whole visible text of a page as one string (tags become spaces). */
function flatText(html) {
  return squash(decode(bodyOf(html).replace(/<[^>]+>/g, ' ')));
}

/** Text of the app's JS chunks, for client-rendered states (e.g. the waitlist success line). */
function clientText(outDir) {
  const files = [];
  const walk = (d) => {
    for (const n of readdirSync(d)) {
      const p = join(d, n);
      if (statSync(p).isDirectory()) walk(p);
      else if (n.endsWith('.js')) files.push(p);
    }
  };
  walk(join(outDir, '_next', 'static', 'chunks', 'app'));
  return files
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n')
    .replace(/\\u([0-9a-f]{4})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
}

let failed = 0;
for (const { design, built } of PAIRS) {
  let builtHtml;
  try {
    builtHtml = readFileSync(built, 'utf8');
  } catch {
    console.error(`✖ ${built} not found. Run \`pnpm build\` first.`);
    process.exit(2);
  }
  const haystack = flatText(builtHtml);
  const changes = APPROVED_CHANGES[design] ?? {};
  const designRuns = runs(readFileSync(design, 'utf8'));
  for (const from of Object.keys(changes)) {
    if (!designRuns.includes(from)) {
      console.error(`✖ Approved change no longer matches ${design}: “${from.slice(0, 60)}…”`);
      failed++;
    }
  }
  const expected = designRuns
    .map((t) => (t in changes ? changes[t] : t))
    .filter((t) => t !== null);
  const removed = Object.entries(changes).filter(([, to]) => to === null).map(([from]) => from);
  const resurfaced = removed.filter((t) => flatText(builtHtml).includes(t));
  if (resurfaced.length) {
    failed += resurfaced.length;
    console.error(`✖ ${built}: removed text is back: ${resurfaced.map((t) => `“${t}”`).join(', ')}`);
  }
  let client;
  const missing = expected.filter((t) => {
    if (haystack.includes(t)) return false;
    client ??= clientText(dirname(built));
    return !client.includes(t);
  });
  if (missing.length) {
    failed += missing.length;
    console.error(`✖ ${built}: ${missing.length} text run(s) from ${design} not found verbatim:`);
    for (const m of missing) console.error(`    “${m}”`);
  } else {
    console.log(`✔ ${built}: all ${expected.length} text runs from ${design} present verbatim.`);
  }
}
process.exit(failed ? 1 : 0);
