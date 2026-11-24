import { Footer, LABS_URL, Nav } from '@reservex/ui';
import { Features } from '@/components/Features';
import { Fees } from '@/components/Fees';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { Products } from '@/components/Products';
import { Safety } from '@/components/Safety';
import { TrustStrip } from '@/components/TrustStrip';
import { Waitlist } from '@/components/Waitlist';
import { Why } from '@/components/Why';

export default function Page() {
  return (
    <div className="w-full overflow-hidden bg-white font-sans text-ink">
      <Nav
        wordmark={
          <>
            ReserveX <span className="font-medium text-brand">Trader</span>
          </>
        }
        links={[
          { href: '#products', label: 'Products' },
          { href: '#how', label: 'How it works' },
          { href: '#safety', label: 'Safety' },
          { href: '#fees', label: 'Fees' },
          { href: LABS_URL, label: 'ReserveX Labs' },
        ]}
        cta={{ href: '#waitlist', label: 'Join the waitlist' }}
      />
      <main>
        <Hero />
        <TrustStrip />
        <Why />
        <Products />
        <Features />
        <HowItWorks />
        <Safety />
        <Fees />
        <Waitlist />
      </main>
      <Footer
        name="ReserveX Trader"
        blurb="A product of ReserveX Labs Limited. 5th Floor, Crescent Business Centre, Off Parklands Road, Parklands, Nairobi."
        columns={[
          {
            title: 'Product',
            links: [
              { href: '#products', label: 'What you can own' },
              { href: '#how', label: 'How it works' },
              { href: '#fees', label: 'Fees' },
            ],
          },
          {
            title: 'Company',
            links: [
              { href: LABS_URL, label: 'ReserveX Labs' },
              { href: '#safety', label: 'Safety' },
              { href: '#waitlist', label: 'Contact' },
            ],
          },
        ]}
        disclosure="ReserveX Labs Limited is licensed by the Capital Markets Authority of Kenya as an Intermediary Service Platform Provider (licence no. [LICENCE NO.]). ReserveX does not hold client funds and does not issue investment products; products are offered by their respective licensed managers and intermediaries. The value of investments can go down as well as up, and past performance is not a guide to future returns. © 2026 ReserveX Labs Limited."
      />
    </div>
  );
}
