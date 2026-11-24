import { WaitlistForm } from './WaitlistForm';

export function Waitlist() {
  return (
    <section id="waitlist" className="px-8 pb-section">
      <div className="relative mx-auto box-border max-w-panel overflow-hidden rounded-panel bg-wash px-6 py-24 text-center md:px-12">
        <div
          aria-hidden="true"
          className="absolute left-[-60px] top-[-80px] h-[220px] w-[220px] rounded-pill bg-accent opacity-[0.35]"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-[-140px] right-[-80px] h-[280px] w-[280px] rounded-pill bg-[#D5EADF]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-[760px] font-display text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.06] tracking-[-0.02em]">
            Home is where your money grows.
          </h2>
          <p className="mx-auto mt-6 max-w-[520px] text-[18px] leading-[1.6] text-muted">
            ReserveX Trader launches in Q1 2027. Join the waitlist for early access and launch-day perks.
          </p>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
