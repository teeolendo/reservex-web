import { Eyebrow } from '@reservex/ui';

const points: Array<[string, string]> = [
  [
    'Licensed by the CMA',
    'Authorised as an Intermediary Service Platform Provider by Kenya’s Capital Markets Authority.',
  ],
  ['Non-custodial, always', 'Funds settle into regulated institutional and custodian accounts, never into ours.'],
  ['Security built in', 'Multi-factor login, encrypted card data and a full audit trail behind every movement.'],
];

export function Safety() {
  return (
    <section id="safety" className="px-8">
      <div className="on-brand mx-auto box-border flex max-w-panel flex-wrap gap-16 rounded-panel bg-brand px-7 py-16 text-white md:px-[72px] md:py-24">
        <div className="min-w-0 flex-[1_1_420px]">
          <Eyebrow onBrand>Safety by design</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(36px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.02em]">
            We never hold your money. That’s the point.
          </h2>
          <p className="mt-7 text-[18px] leading-[1.7] text-on-brand-muted">
            ReserveX Trader is a technology platform, not a bank and not a fund. Your money goes straight to licensed
            fund managers, broker-dealers and custodians. We connect you to them, and we never hold it along the way.
          </p>
        </div>
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
          {points.map(([title, body]) => (
            <div key={title} className="rounded-[20px] border border-white/[0.14] bg-white/[0.08] px-7 py-6">
              <h3 className="text-[18px] font-semibold">{title}</h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-on-brand-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
