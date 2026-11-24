import type { ReactNode } from 'react';
import { Card, Eyebrow, IconTile, Section } from '@reservex/ui';

const products: Array<{ title: string; body: string; icon: ReactNode }> = [
  {
    title: 'Money market funds',
    body: 'Daily-priced funds for your cash. Park it, sweep idle balances into it, withdraw when you need it. Returns are not guaranteed.',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v8" />
        <path d="M9.5 10.5c0-1.4 1.1-2 2.5-2s2.5.6 2.5 1.8c0 2.6-5 1.4-5 4 0 1.2 1.1 1.8 2.5 1.8s2.5-.6 2.5-2" />
      </>
    ),
  },
  {
    title: 'Unit trusts & CIS',
    body: 'Balanced, equity and fixed income schemes run by licensed managers. Diversified from your first contribution.',
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="2" />
        <rect x="13" y="4" width="7" height="7" rx="2" />
        <rect x="4" y="13" width="7" height="7" rx="2" />
        <rect x="13" y="13" width="7" height="7" rx="2" />
      </>
    ),
  },
  {
    title: 'NSE stocks, live',
    body: 'Real-time prices, with orders placed on the Nairobi Securities Exchange through a licensed stockbroker. No phone calls.',
    icon: (
      <>
        <path d="M4 19h16" />
        <path d="M6 16V9" />
        <path d="M10 16V6" />
        <path d="M14 16v-5" />
        <path d="M18 16V8" />
      </>
    ),
  },
  {
    title: 'ETFs',
    body: 'A whole sector in a single trade, from banking to gold. Low cost, exchange-listed, easy to hold.',
    icon: (
      <>
        <circle cx="8" cy="12" r="4" />
        <circle cx="16" cy="12" r="4" />
      </>
    ),
  },
  {
    title: 'REITs',
    body: 'Own a slice of Kenyan real estate without the title deed drama, the caretaker or the 2am calls.',
    icon: (
      <>
        <path d="M4 11l8-6 8 6" />
        <path d="M6 10v9h12v-9" />
        <path d="M10 19v-5h4v5" />
      </>
    ),
  },
  {
    title: 'Government bonds',
    body: 'Kenyan Treasury exposure through regulated fixed income funds, run by licensed managers.',
    icon: (
      <>
        <path d="M6 4h9l3 3v13H6z" />
        <path d="M9 10h6" />
        <path d="M9 14h6" />
      </>
    ),
  },
];

export function Products() {
  return (
    <Section id="products" className="pb-section pt-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>The whole market, one login</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(34px,3.6vw,48px)] font-normal leading-[1.1] tracking-[-0.02em]">
            Everything worth owning in Kenya.
          </h2>
        </div>
        <p className="max-w-[420px] text-[17px] leading-[1.6] text-muted">
          Products from CMA-licensed fund managers and the Nairobi Securities Exchange, side by side. Compare, pick,
          own.
        </p>
      </div>

      <div className="mt-14 flex flex-wrap gap-5">
        {products.map((p) => (
          <Card key={p.title} className="flex-[1_1_340px]">
            <IconTile>{p.icon}</IconTile>
            <h3 className="mt-7 text-[21px] font-semibold tracking-[-0.01em]">{p.title}</h3>
            <p className="mt-3 text-[16px] leading-[1.65] text-muted">{p.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
