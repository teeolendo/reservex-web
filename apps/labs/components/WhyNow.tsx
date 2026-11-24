import { Eyebrow, cn } from '@reservex/ui';

const safeguards: Array<[string, string]> = [
  ['Settlement', 'Licensed payment rails only; proceeds swept to the custodian on receipt.'],
  ['NAV integrity', 'Multi-signature publication with tolerance and staleness controls.'],
  ['Software', 'Independent audit before launch; time-delayed upgrades.'],
  ['Reconciliation', 'Issue and cancel only on confirmed instructions, with proof of reserves.'],
  ['Redemption pressure', 'Existing windows and gating apply; launch caps and per-holder limits.'],
  ['Distribution', 'Licensed venues only; transfers restricted to approved holders.'],
];

export function WhyNow() {
  return (
    <section className="bg-wash">
      <div className="mx-auto box-border flex max-w-container flex-wrap gap-[72px] px-8 py-section">
        <div className="min-w-0 flex-[1_1_440px]">
          <Eyebrow>Why now</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(36px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.02em]">
            The rules now make this possible.
          </h2>
          <p className="mt-6 text-[18px] leading-[1.7] text-muted">
            African regulators are writing tokenisation into law. Kenya’s VASP Act 2025 and its 2026 Regulations make
            token issuance a licensed, supervised activity, with a clear route through the capital markets regulator.
            Other markets are following.
          </p>
          <p className="mt-5 text-[18px] leading-[1.7] text-muted">
            Being the first regulated tokenised fund in a market is a distinction that can only be claimed once.
          </p>
          <div className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-3 rounded-card bg-white p-8">
            <span className="font-display text-[52px] leading-none tracking-[-0.03em] text-brand">$18.9tn</span>
            <span className="flex-[1_1_220px] text-[15px] leading-[1.6] text-muted">
              projected value of tokenised assets by 2033, up from $0.6tn today. Industry estimate, 2025.
            </span>
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_440px]">
          <Eyebrow>Safeguards</Eyebrow>
          <h3 className="mt-4 font-display text-[32px] font-normal tracking-[-0.02em]">New risks, addressed directly.</h3>
          <dl className="m-0 mt-7 flex flex-col gap-[2px]">
            {safeguards.map(([title, body], i) => (
              <div
                key={title}
                className={cn(
                  'border-t border-[#DCE9E2] py-5',
                  i === safeguards.length - 1 && 'border-b',
                )}
              >
                <dt className="text-[16px] font-semibold">{title}</dt>
                <dd className="m-0 mt-1 text-[15px] leading-[1.6] text-muted">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
