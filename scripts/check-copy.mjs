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
  const expected = runs(readFileSync(design, 'utf8'));
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
