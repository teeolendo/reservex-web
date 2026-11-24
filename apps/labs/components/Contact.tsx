import { ButtonLink, TRADER_URL } from '@reservex/ui';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@reservexlabs.com';

export function Contact() {
  return (
    <section id="contact" className="px-8 pb-section">
      <div className="on-brand relative mx-auto box-border max-w-panel overflow-hidden rounded-panel bg-brand px-6 py-[104px] text-center text-white md:px-12">
        <div
          aria-hidden="true"
          className="absolute right-[-70px] top-[-120px] h-[260px] w-[260px] rounded-pill bg-accent opacity-90"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-170px] left-[-100px] h-[300px] w-[300px] rounded-pill bg-[#1B6649]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-[820px] font-display text-[clamp(38px,4.8vw,66px)] font-normal leading-[1.04] tracking-[-0.02em]">
            Be the first in your market.
          </h2>
          <p className="mx-auto mt-6 max-w-[580px] text-[18px] leading-[1.6] text-on-brand-muted">
            Tell us about your fund. We’ll come back with a view on structure, licensing route and timeline, and what
            it would take to launch.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-[14px]">
            <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="light">
              Book a conversation
            </ButtonLink>
            <ButtonLink href={TRADER_URL} variant="outline-light">
              Investing for yourself? Try ReserveX Trader
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
