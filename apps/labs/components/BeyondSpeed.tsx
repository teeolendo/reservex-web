import { Eyebrow } from '@reservex/ui';

const benefits: Array<[string, string]> = [
  [
    'Redemptions become loans',
    'Holders pledge units and borrow against them, valued at official NAV. They stay invested; you keep the assets, the client and the fee, with no balance-sheet exposure.',
  ],
  [
    'A global distribution channel',
    'Regulated, actively managed African funds are scarce on global venues. Listing puts yours in front of investors you could never reach before.',
  ],
  [
    'Rules enforced in software',
    'Eligibility, KYC status, minimums, lock-ins and holder limits are checked on every transaction, every time.',
  ],
  [
    'Real-time oversight',
    'Holdings, flows and NAV visible as they happen to your trustee, custodian and regulator, with a complete audit trail.',
  ],
  [
    'Open beyond banking hours',
    'Instructions accepted whenever investors act. Your dealing windows and gating still apply.',
  ],
  [
    'One record, no breaks',
    'Bank, administrator, custodian and manager read the same register, so reconciliation breaks are prevented, not fixed.',
  ],
];

export function BeyondSpeed() {
  return (
    <section className="px-8">
      <div className="on-brand mx-auto box-border max-w-panel rounded-panel bg-brand px-7 py-16 text-white md:px-[72px] md:py-24">
        <Eyebrow onBrand>Beyond speed</Eyebrow>
        <h2 className="mt-4 max-w-[820px] font-display text-[clamp(36px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.02em]">
          Once a unit is a token, your fund can do more.
        </h2>
        <div className="mt-16 flex flex-wrap gap-x-14 gap-y-12">
          {benefits.map(([title, body]) => (
            <div key={title} className="flex-[1_1_300px]">
              <h3 className="text-[20px] font-semibold">{title}</h3>
              <p className="mt-[10px] text-[15px] leading-[1.7] text-on-brand-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
