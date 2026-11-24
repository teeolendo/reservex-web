import { Eyebrow, Section } from '@reservex/ui';

export function Why() {
  return (
    <Section className="pb-12 pt-section">
      <Eyebrow>Why we built it</Eyebrow>
      <h2 className="mt-5 max-w-[900px] font-display text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.08] tracking-[-0.02em]">
        Investing back home shouldn’t take a broker, a branch and a cousin with power of attorney.
      </h2>
      <p className="mt-8 max-w-[760px] text-[19px] leading-[1.7] text-muted">
        Kenya’s capital markets are deep, regulated and productive. Getting into them has been the hard part: paper
        forms, local bank accounts, wire fees and a lot of waiting. ReserveX Trader removes the friction, so you can
        put your money to work at home as easily as you spend it abroad.
      </p>
    </Section>
  );
}
