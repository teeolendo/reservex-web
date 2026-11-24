import { Eyebrow, Section, cn } from '@reservex/ui';

const steps: Array<[string, string]> = [
  ['Verify your identity', 'Snap your ID or passport and a selfie. Kenyan and foreign documents both work.'],
  ['Fund your account', 'Add a card or link your bank. Contribute once or set up a monthly plan.'],
  ['Own the market', 'Pick funds, stocks, ETFs or REITs. Track it all in one place, in shillings or dollars.'],
];

export function HowItWorks() {
  return (
    <Section id="how" className="py-section">
      <div className="mx-auto max-w-[720px] text-center">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(34px,3.6vw,48px)] font-normal leading-[1.1] tracking-[-0.02em]">
          From sign-up to invested before your tea goes cold.
        </h2>
      </div>
      <ol className="m-0 mt-[72px] flex list-none flex-wrap gap-5 p-0">
        {steps.map(([title, body], i) => {
          const highlight = i === steps.length - 1;
          return (
            <li
              key={title}
              className={cn('box-border flex-[1_1_320px] rounded-card p-10', highlight ? 'bg-accent' : 'bg-tint')}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-pill font-semibold text-white',
                  highlight ? 'bg-ink' : 'bg-brand',
                )}
              >
                {i + 1}
              </span>
              <h3 className={cn('mt-7 text-[22px] font-semibold', highlight && 'text-ink')}>{title}</h3>
              <p className={cn('mt-3 text-[16px] leading-[1.7]', highlight ? 'text-ink-soft' : 'text-muted')}>{body}</p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
