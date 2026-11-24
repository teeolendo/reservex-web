import { Eyebrow, Section, cn } from '@reservex/ui';

export function Fees() {
  const rows = [
    {
      label: 'Platform fee',
      value: (
        <>
          0.25% <span className="font-sans text-[14px] text-subtle">a year</span>
        </>
      ),
    },
    { label: 'On each contribution', value: '0.50%' },
    { label: 'Withdrawals', value: 'Free' },
  ];

  return (
    <Section id="fees" className="py-section">
      <div className="flex flex-wrap items-center gap-16">
        <div className="min-w-0 flex-[1_1_440px]">
          <Eyebrow>Fees</Eyebrow>
          <h2 className="mt-4 font-display text-[clamp(36px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.02em]">
            Invest $100. Your fund gets $100.
          </h2>
          <p className="mt-6 max-w-[500px] text-[18px] leading-[1.7] text-muted">
            No hidden spreads, no exit penalties. Card processing is shown on top before you pay, so the full amount you
            choose goes to work.
          </p>
        </div>
        <dl className="m-0 box-border min-w-0 flex-[1_1_514px] rounded-card-lg border border-border px-6 py-3 sm:px-9">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={cn(
                'flex items-baseline justify-between gap-4 py-7',
                i < rows.length - 1 && 'border-b border-line',
              )}
            >
              <dt className="text-[17px]">{r.label}</dt>
              <dd className="m-0 font-display text-[32px] text-brand">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
