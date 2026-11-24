import { Eyebrow, Section, cn } from '@reservex/ui';

// Durations and timelines are deliberately not shown.
const phases: Array<{ title: string; body: string; gate: string }> = [
  {
    title: 'Blueprint',
    body: 'Deal structure, licence application, engineering and go-to-market plans. No code yet: just a plan you can take to your board.',
    gate: 'At the gate: legal, licensing, engineering and strategy blueprints',
  },
  {
    title: 'Build & submit',
    body: 'Application lodged. Contracts signed with auditors, distributors and partners. Smart contracts built and integrated to demo standard.',
    gate: 'At the gate: application lodged, contracts signed, live demo',
  },
  {
    title: 'Test & license',
    body: 'End-to-end testing with partners, an independent smart-contract audit, interoperability checks and liquidity set up, while we handle the regulator.',
    gate: 'At the gate: licence issued, product market-ready',
  },
  {
    title: 'Launch',
    body: 'A capped launch, listings go live, pricing confirmed, and the licence and product announced together with every partner in the room.',
    gate: 'The result: a live, licensed tokenised class',
  },
];

export function Programme() {
  return (
    <Section id="programme" className="py-section">
      <div className="mx-auto max-w-[780px] text-center">
        <Eyebrow>How we deliver</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(36px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.02em]">
          Four phases. One team. You sign off every gate.
        </h2>
        <p className="mx-auto mt-6 max-w-[640px] text-[18px] leading-[1.7] text-muted">
          You commit one phase at a time against signed-off deliverables. Nothing is lodged, built or launched without
          your approval.
        </p>
      </div>
      <ol className="m-0 mt-[72px] flex list-none flex-wrap gap-5 p-0">
        {phases.map((p, i) => {
          const last = i === phases.length - 1;
          return (
            <li
              key={p.title}
              className={cn(
                'box-border flex flex-[1_1_250px] flex-col rounded-card border p-8',
                last ? 'on-brand border-brand bg-brand text-white' : 'border-border',
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-[13px] font-semibold uppercase tracking-[0.06em]',
                    last ? 'text-on-brand-subtle' : 'text-brand',
                  )}
                >
                  Phase {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[30px] font-normal tracking-[-0.02em]">{p.title}</h3>
              <p className={cn('mt-3 text-[15px] leading-[1.65]', last ? 'text-on-brand-muted' : 'text-muted')}>
                {p.body}
              </p>
              <p
                className={cn(
                  'mt-auto border-t pt-5 text-[13px] leading-[1.6]',
                  last ? 'border-white/[0.18] text-accent' : 'border-line text-brand',
                )}
              >
                {p.gate}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
