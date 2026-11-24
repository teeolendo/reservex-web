import { ButtonLink, Pill } from '@reservex/ui';

const holdings: Array<[string, string]> = [
  ['Money market fund', '42%'],
  ['NSE stocks', '27%'],
  ['Bond fund', '16%'],
  ['REIT', '9%'],
  ['Banking ETF', '6%'],
];

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto box-border flex max-w-container flex-wrap items-center gap-[72px] px-8 pb-24 pt-[112px]"
    >
      <div className="min-w-0 flex-[1_1_520px]">
        <Pill>Licensed by the Capital Markets Authority</Pill>
        <h1 className="mt-7 font-display text-[clamp(48px,6vw,80px)] font-normal leading-[1.02] tracking-[-0.025em] text-ink">
          The front door to Kenya’s capital markets.
        </h1>
        <p className="mt-7 max-w-[540px] text-[20px] leading-[1.6] text-muted">
          Money market funds, unit trusts, ETFs, REITs, bonds and live NSE stocks. One app. Funded with the card in
          your wallet, from wherever you are in the world.
        </p>
        <div className="mt-10 flex flex-wrap gap-[14px]">
          <ButtonLink href="#waitlist">Get early access</ButtonLink>
          <ButtonLink href="#products" variant="ghost">
            See what you can own
          </ButtonLink>
        </div>
        <p className="mt-7 text-[14px] text-subtle">Launching Q1 2027 · iOS, Android and web</p>
      </div>

      {/* Static, illustrative mockup. Figures are not live data. */}
      <div className="relative flex min-w-0 flex-[1_1_360px] flex-col items-center">
        <div aria-hidden="true" className="absolute top-[60px] h-[420px] w-[420px] rounded-pill bg-tint" />
        <div aria-hidden="true" className="absolute right-[12%] top-5 h-[120px] w-[120px] rounded-pill bg-accent opacity-90" />
        <figure
          role="img"
          aria-label="ReserveX Trader app showing a portfolio across money market funds, NSE stocks, a REIT and an ETF"
          className="relative m-0 box-border w-full max-w-[358px] rounded-[40px] border border-border bg-white p-[18px] shadow-hero"
        >
          <div className="flex flex-col gap-[18px] rounded-[28px] bg-[#FBFDFC] px-5 pb-5 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-subtle">Portfolio</span>
              <span className="rounded-pill bg-tint px-[10px] py-1 text-[12px] text-brand">KES · USD</span>
            </div>
            <div>
              <div className="whitespace-nowrap font-display text-[clamp(32px,9.5vw,40px)] tracking-[-0.02em] text-ink">KES 1,248,300</div>
              <div className="mt-1 text-[13px] text-positive">+ KES 18,420 this month</div>
            </div>
            <div className="flex flex-col gap-[2px]">
              {holdings.map(([name, pct], i) => (
                <div
                  key={name}
                  className={`flex justify-between py-3 text-[14px] ${i < holdings.length - 1 ? 'border-b border-line' : ''}`}
                >
                  <span>{name}</span>
                  <span className="text-muted">{pct}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 rounded-[18px] bg-brand p-4 text-white">
              <div>
                <div className="text-[12px] text-on-brand-subtle">Monthly plan</div>
                <div className="mt-[2px] whitespace-nowrap text-[15px] font-medium">$200 every month</div>
              </div>
              <span className="whitespace-nowrap rounded-pill bg-white/[0.14] px-[10px] py-[6px] text-[12px]">Visa ·· 4417</span>
            </div>
          </div>
        </figure>
        <p className="relative mt-4 text-[13px] text-subtle">Illustrative only. Not real data.</p>
      </div>
    </section>
  );
}
