import { Eyebrow } from '@reservex/ui';

const features: Array<[string, string]> = [
  ['Pay the way you pay', 'Card, bank transfer or open banking. No Kenyan bank account needed, no SWIFT forms, no queue.'],
  [
    'Set it and forget it',
    'Recurring contributions on your schedule. Name a goal (a home, school fees, retirement) and watch it fill up.',
  ],
  ['Cash out to M-PESA', 'Withdraw straight to M-PESA or your bank. Send to family at home without moving money twice.'],
  ['See every shilling', 'Exchange rates and charges shown before you confirm. What you see is what lands in your fund.'],
  ['Reinvest automatically', 'Dividends and distributions roll straight back in, so your returns earn returns.'],
  [
    'Name a beneficiary',
    'Decide who inherits your portfolio, in the app, in minutes. Your family won’t have to untangle it later.',
  ],
];

export function Features() {
  return (
    <section className="bg-wash">
      <div className="mx-auto box-border max-w-container px-8 py-section">
        <Eyebrow>Built for life abroad</Eyebrow>
        <h2 className="mt-4 max-w-[720px] font-display text-[clamp(34px,3.6vw,48px)] font-normal leading-[1.1] tracking-[-0.02em]">
          Invest back home with the money tools you already use.
        </h2>
        <div className="mt-[72px] flex flex-wrap gap-x-16 gap-y-14">
          {features.map(([title, body], i) => (
            <div key={title} className="flex-[1_1_300px]">
              <div className="font-display text-[22px] text-brand">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="mt-4 text-[20px] font-semibold">{title}</h3>
              <p className="mt-3 text-[16px] leading-[1.7] text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
