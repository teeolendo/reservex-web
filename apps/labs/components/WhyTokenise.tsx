import { Eyebrow, Section } from '@reservex/ui';

const stats: Array<[string, string]> = [
  ['0.74%', 'of AUM spent on fund operations, on average. For most managers, it’s the largest cost line.'],
  ['64%', 'of those costs sit in the back office: transfer agency, reconciliation, settlement.'],
  ['23%', 'lower operating cost with tokenisation. Transfer agency falls 25%, fund accounting 30%.'],
  ['3 wks', 'faster to launch a new share class or mandate, from a USD class to a new strategy.'],
];

export function WhyTokenise() {
  return (
    <Section id="why" className="pb-24 pt-section">
      <Eyebrow>Why tokenise</Eyebrow>
      <h2 className="mt-5 max-w-[900px] font-display text-[clamp(38px,4.6vw,62px)] font-normal leading-[1.06] tracking-[-0.02em]">
        Issuance and redemption are the bottleneck.
      </h2>
      <p className="mt-7 max-w-[780px] text-[19px] leading-[1.7] text-muted">
        Instructions by email and phone. Bank transfers that take days. Operations matching payments by hand, units
        keyed onto a register, redemptions paid out weeks later. Five hand-offs, four parties, no single source of
        truth. It holds together at small scale. At a billion dollars and thousands of investors, every step adds
        delay, rework and error.
      </p>

      <div className="mt-[72px] flex flex-wrap gap-5">
        {stats.map(([figure, body]) => (
          <div key={figure} className="flex-[1_1_240px] border-t-2 border-brand pt-6">
            <div className="font-display text-[60px] leading-none tracking-[-0.03em] text-brand">{figure}</div>
            <p className="mt-[14px] text-[15px] leading-[1.6] text-muted">{body}</p>
          </div>
        ))}
      </div>
      <p className="mt-7 text-[13px] text-subtle">Industry estimates, 2025. Applied for illustration.</p>
    </Section>
  );
}
