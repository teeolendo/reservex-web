import { Card, Eyebrow, Section } from '@reservex/ui';

const assets: Array<[string, string]> = [
  ['Funds', 'Money market, fixed income, special and balanced funds: tokenised share classes on your existing mandate.'],
  ['Bonds', 'Sovereign and corporate debt, in local currency and Eurobond form, made fractional and transferable.'],
  ['Real assets', 'REITs, infrastructure and real estate vehicles, with ownership that moves as easily as cash.'],
  ['Private markets', 'Private credit and alternative strategies, opened to a broader, verified investor base.'],
];

export function Assets() {
  return (
    <Section id="assets" className="py-section">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>What we tokenise</Eyebrow>
          <h2 className="mt-4 max-w-[620px] font-display text-[clamp(36px,4vw,56px)] font-normal leading-[1.06] tracking-[-0.02em]">
            Built for Africa’s asset classes.
          </h2>
        </div>
        <p className="max-w-[420px] text-[17px] leading-[1.6] text-muted">
          Headquartered in Nairobi, working across the continent’s markets, wherever the regulation allows it.
        </p>
      </div>
      <div className="mt-14 flex flex-wrap gap-5">
        {assets.map(([title, body]) => (
          <Card key={title} className="flex-[1_1_260px]">
            <h3 className="font-display text-[30px] font-normal tracking-[-0.02em]">{title}</h3>
            <p className="mt-3 text-[15px] leading-[1.65] text-muted">{body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
