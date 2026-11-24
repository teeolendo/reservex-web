import type { ReactNode } from 'react';
import { Card, Eyebrow, IconTile } from '@reservex/ui';

const services: Array<{ title: string; body: string; icon: ReactNode }> = [
  {
    title: 'Advisory & structuring',
    body: 'Every entity in the stack mapped (issuer, manager, administrator, custodian, bank) with its roles and governing documents. Existing agreements reworked for the tokenised class.',
    icon: (
      <>
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M5 7l-3 6a3 3 0 006 0z" />
        <path d="M19 7l-3 6a3 3 0 006 0z" />
      </>
    ),
  },
  {
    title: 'Licensing & regulatory',
    body: 'Product classification, fit-and-proper and full applications, prepared, lodged and followed through to issuance. We stay your single point of contact with the regulator.',
    icon: (
      <>
        <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Engineering & integration',
    body: 'Smart contracts written in-house and wired into your fund management system. Investor product and mobile design included. You don’t rebuild your operations; we plug into them.',
    icon: (
      <>
        <path d="M8 7l-5 5 5 5" />
        <path d="M16 7l5 5-5 5" />
        <path d="M13 5l-2 14" />
      </>
    ),
  },
  {
    title: 'Distribution & listing',
    body: 'We act as your listing agent across licensed global venues: due diligence, disclosure, technical onboarding and launch. A new investor base, not just a new back office.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 010 18" />
        <path d="M12 3a14 14 0 000 18" />
      </>
    ),
  },
  {
    title: 'Liquidity & lending',
    body: 'Market-making and lending arrangements in place so units trade at or near NAV from day one, and holders can borrow against them without redeeming.',
    icon: <path d="M12 3c3 4 6 7 6 11a6 6 0 01-12 0c0-4 3-7 6-11z" />,
  },
  {
    title: 'Ongoing operations',
    body: 'After launch, keep us on as your tokenisation operations and strategy team, or take a clean handover of the product. Your choice, not a lock-in.',
    icon: (
      <>
        <path d="M21 12a9 9 0 11-3-6.7" />
        <path d="M21 4v5h-5" />
      </>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="bg-wash">
      <div className="mx-auto box-border max-w-container px-8 py-section">
        <Eyebrow>What we do</Eyebrow>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[700px] font-display text-[clamp(36px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.02em]">
            Everything it takes to go onchain. Under one roof.
          </h2>
          <p className="max-w-[420px] text-[17px] leading-[1.6] text-muted">
            Most managers would have to stitch together lawyers, developers, licensing advisers and exchange contacts.
            We bring the whole bench.
          </p>
        </div>
        <div className="mt-16 flex flex-wrap gap-5">
          {services.map((s) => (
            <Card key={s.title} className="flex-[1_1_340px] bg-white">
              <IconTile>{s.icon}</IconTile>
              <h3 className="mt-7 text-[21px] font-semibold">{s.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.65] text-muted">{s.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
