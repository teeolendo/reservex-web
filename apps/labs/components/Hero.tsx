import { ButtonLink, Pill, cn } from '@reservex/ui';

const layers = [
  'Advisory & structuring',
  'Licensing & regulatory',
  'Smart contracts & integration',
  'Distribution & listing',
  'Liquidity & lending',
  'Ongoing operations',
];

export function Hero() {
  return (
    <section
      id="top"
      className="mx-auto box-border flex max-w-container flex-wrap items-center gap-[72px] px-8 pb-[120px] pt-[112px]"
    >
      <div className="min-w-0 flex-[1_1_560px]">
        <Pill>Token Issuance Platform licence: application lodged</Pill>
        <h1 className="mt-7 font-display text-[clamp(52px,6.6vw,92px)] font-normal leading-[0.98] tracking-[-0.03em]">
          Tokenising African capital markets.
        </h1>
        <p className="mt-[30px] max-w-[580px] text-[20px] leading-[1.6] text-muted">
          The full-service tokenisation partner for Africa’s fund managers and issuers. Advisory, structuring,
          licensing, engineering, distribution and liquidity, delivered by one team, from blueprint to launch.
        </p>
        <div className="mt-10 flex flex-wrap gap-[14px]">
          <ButtonLink href="#contact">Tokenise your fund</ButtonLink>
          <ButtonLink href="#programme" variant="ghost">
            See how we deliver
          </ButtonLink>
        </div>
        <p className="mt-7 max-w-[580px] text-[14px] leading-[1.6] text-subtle">
          ReserveX Labs Limited is licensed by the Capital Markets Authority only as an Intermediary Service Platform
          Provider, for ReserveX Trader. We do not yet hold a Token Issuance Platform licence; our application is under
          review, and we do not provide token issuance services until it is granted.
        </p>
      </div>

      <div className="relative flex min-w-0 flex-[1_1_380px] justify-center">
        <div aria-hidden="true" className="absolute top-6 h-[340px] w-[340px] rotate-[-7deg] rounded-[56px] bg-tint" />
        <div aria-hidden="true" className="absolute right-[10%] top-[-14px] h-[104px] w-[104px] rounded-pill bg-accent" />
        <figure
          role="img"
          aria-label="The ReserveX tokenisation stack: advisory and structuring, licensing, engineering, distribution, liquidity and lending, and ongoing operations, all from one partner"
          className="relative m-0 box-border w-full max-w-[380px] rounded-card-lg border border-border bg-white p-8 shadow-hero"
        >
          <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-brand">
            One partner · The whole stack
          </div>
          <div className="mt-5 flex flex-col gap-2">
            {layers.map((layer, i) => {
              const last = i === layers.length - 1;
              return (
                <div
                  key={layer}
                  className={cn(
                    'flex items-center gap-[14px] rounded-tile px-4 py-[13px] text-[15px]',
                    last ? 'bg-brand text-white' : 'bg-wash',
                  )}
                >
                  <span className={cn('w-[22px] shrink-0 font-display', last ? 'text-on-brand-subtle' : 'text-brand')}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {layer}
                </div>
              );
            })}
          </div>
          <div className="mt-5 text-[13px] text-subtle">
            One counterparty. One plan. One point of contact with the regulator.
          </div>
        </figure>
      </div>
    </section>
  );
}
