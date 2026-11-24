#!/usr/bin/env node
// Content-rule checks over the built static output (HANDOFF.md §6).
//
//   node scripts/check-content.mjs trader   # no crypto / virtual-asset vocabulary
//   node scripts/check-content.mjs labs     # no third-party company names
//
// Scans every text file in the app's `out/` directory (HTML, RSC payloads,
// JS chunks, metadata), so copy, alt text, OG tags and shipped comments are
// all covered. Exits non-zero on any hit.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const RULES = {
  trader: {
    dir: 'apps/trader/out',
    description: 'crypto or virtual-asset vocabulary on the Trader site',
    // §10: token|blockchain|onchain|crypto|virtual asset. "token" also catches tokenise/tokenisation.
    pattern: /token|blockchain|on-?chain|crypto|virtual[\s-]+assets?|web3|stablecoin|\bdefi\b|\bnft\b/gi,
    // Identifiers inside Next.js/polyfill framework code, not our content.
    allow: ['DOMTokenList', 'x-next-revalidate-tag-token', 'NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER'],
  },
  labs: {
    dir: 'apps/labs/out',
    description: 'third-party company names on the tokenisation site',
    // Partners, competitors, banks, chains, exchanges and research firms. Case-sensitive proper nouns.
    pattern: new RegExp(
      `\\b(${[
        // chains / networks / protocols
        'Ethereum', 'Solana', 'Polygon', 'Avalanche', 'Stellar', 'Hedera', 'Algorand', 'Arbitrum', 'Optimism',
        'Tron', 'Ripple', 'XRP', 'Bitcoin', 'Cardano', 'Tezos', 'Polkadot', 'Cosmos', 'Chainlink', 'Hyperledger',
        'Canton', 'Celo', 'Starknet', 'zkSync', 'Aptos',
        // stablecoins / issuers / tokenisation platforms
        'Circle', 'Tether', 'USDC', 'USDT', 'Paxos', 'Securitize', 'Ondo', 'Superstate', 'Centrifuge', 'Maple',
        'Tokeny', 'Libre', 'Backed', 'Figure', 'BUIDL', 'Fireblocks', 'Anchorage', 'Copper', 'Taurus',
        // asset managers / banks
        'BlackRock', 'Franklin', 'Templeton', 'Fidelity', 'Vanguard', 'Invesco', 'WisdomTree', 'Hamilton Lane',
        'Apollo', 'KKR', 'JPMorgan', 'J\\.P\\. Morgan', 'Kinexys', 'Onyx', 'Goldman', 'HSBC', 'Citi', 'Citigroup',
        'Barclays', 'UBS', 'Standard Chartered', 'Absa', 'Stanbic', 'Equity Bank', 'KCB', 'NCBA', 'Co-op Bank',
        'Safaricom', 'M-PESA', 'Visa', 'Mastercard', 'Britam', 'CIC', 'Sanlam', 'Old Mutual', 'Cytonn',
        // exchanges / venues
        'Binance', 'Coinbase', 'Kraken', 'OKX', 'Bybit', 'Gemini', 'Bitstamp', 'Nasdaq', 'NYSE', 'LSE', 'NSE',
        'JSE', 'Nairobi Securities Exchange',
        // research / consulting
        'McKinsey', 'BCG', 'Boston Consulting', 'Bain', 'Deloitte', 'PwC', 'KPMG', 'EY', 'Ernst', 'Accenture',
        'Calastone', 'Broadridge', 'Moody', 'S&P', 'Roland Berger', 'Oliver Wyman', 'Bernstein', 'Citi GPS',
      ].join('|')})\\b`,
      'g',
    ),
    allow: [],
  },
};

const TEXT_EXT = new Set(['.html', '.txt', '.js', '.json', '.css', '.xml', '.webmanifest', '']);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (TEXT_EXT.has(extname(name))) yield p;
  }
}

const target = process.argv[2];
const rule = RULES[target];
if (!rule) {
  console.error(`usage: check-content.mjs <${Object.keys(RULES).join('|')}>`);
  process.exit(2);
}

// CHECK_DIR lets the self-test point a rule at a fixture copy.
if (process.env.CHECK_DIR) rule.dir = process.env.CHECK_DIR;

let dirOk = false;
try {
  dirOk = statSync(rule.dir).isDirectory();
} catch {}
if (!dirOk) {
  console.error(`✖ ${rule.dir} not found. Run \`pnpm build\` first.`);
  process.exit(2);
}

const hits = [];
let files = 0;
for (const file of walk(rule.dir)) {
  const buf = readFileSync(file);
  if (buf.includes(0)) continue; // binary (e.g. extensionless PNG metadata images)
  files++;
  let text = buf.toString('utf8');
  for (const a of rule.allow) text = text.split(a).join(' '.repeat(a.length));
  for (const m of text.matchAll(rule.pattern)) {
    const s = Math.max(0, m.index - 40);
    hits.push({ file: relative(rule.dir, file), match: m[0], context: text.slice(s, m.index + m[0].length + 40) });
  }
}

if (hits.length) {
  console.error(`✖ Found ${hits.length} instance(s) of ${rule.description}:\n`);
  for (const h of hits) console.error(`  ${h.file}: "${h.match}"\n    …${h.context.replace(/\s+/g, ' ')}…\n`);
  process.exit(1);
}
console.log(`✔ No ${rule.description} (${files} files scanned in ${rule.dir}).`);
