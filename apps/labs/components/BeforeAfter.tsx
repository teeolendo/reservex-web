import { Section, cn } from '@reservex/ui';

const rows: Array<{ step: string; today: string; after: string; highlight?: boolean }> = [
  { step: 'Instruction', today: 'Email or phone, keyed in by operations', after: 'Submitted digitally; eligibility checked automatically' },
  { step: 'Payment', today: 'Bank transfer, days to clear', after: 'Payment and instruction arrive as one transaction' },
  { step: 'Matching', today: 'Operations reconciles transfers by hand', after: 'Nothing to match' },
  { step: 'Register', today: 'Administrator keys units manually', after: 'Units issued or cancelled at official NAV, automatically' },
  {
    step: 'Settlement',
    today: 'Redemptions paid out weeks later',
    after: 'Minutes; cash swept to the custodian on receipt',
    highlight: true,
  },
  {
    step: 'Reconciliation',
    today: 'Daily, across bank, administrator and register',
    after: 'Reconciled by construction: one shared record',
    highlight: true,
  },
];

const th = 'px-8 py-[22px] text-[13px] font-semibold uppercase tracking-[0.06em]';
const cell = 'px-8 py-[22px]';

export function BeforeAfter() {
  return (
    <Section className="pb-section pt-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="max-w-[640px] font-display text-[clamp(34px,3.6vw,48px)] font-normal leading-[1.1] tracking-[-0.02em]">
          Five hand-offs become one transaction.
        </h2>
        <p className="max-w-[420px] text-[17px] leading-[1.6] text-muted">
          Your manager, administrator, trustee and custodian keep their roles. What changes is the record they share.
        </p>
      </div>
      {/* Scrolls horizontally on narrow screens; focusable so keyboard users can scroll it. */}
      <div
        role="region"
        aria-label="Five hand-offs become one transaction"
        tabIndex={0}
        className="mt-12 overflow-x-auto rounded-card-lg border border-border"
      >
        <table className="w-full min-w-[720px] border-collapse text-[16px]">
          <thead>
            <tr className="bg-wash text-left">
              <th scope="col" className={cn(th, 'w-[20%] text-subtle')}>
                Step
              </th>
              <th scope="col" className={cn(th, 'w-[38%] text-subtle')}>
                Today
              </th>
              <th scope="col" className={cn(th, 'text-brand')}>
                With ReserveX
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.step} className="border-t border-line">
                <th scope="row" className={cn(cell, 'text-left font-semibold')}>
                  {r.step}
                </th>
                <td className={cn(cell, 'text-subtle')}>{r.today}</td>
                <td className={cn(cell, r.highlight && 'font-medium text-brand')}>{r.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
