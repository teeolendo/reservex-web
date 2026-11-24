import { Footer, Nav, TRADER_URL } from '@reservex/ui';
import { Assets } from '@/components/Assets';
import { BeforeAfter } from '@/components/BeforeAfter';
import { BeyondSpeed } from '@/components/BeyondSpeed';
import { Contact } from '@/components/Contact';
import { Hero } from '@/components/Hero';
import { Programme } from '@/components/Programme';
import { Services } from '@/components/Services';
import { Statement } from '@/components/Statement';
import { Team } from '@/components/Team';
import { WhyNow } from '@/components/WhyNow';
import { WhyTokenise } from '@/components/WhyTokenise';

export default function Page() {
  return (
    <div className="w-full overflow-hidden bg-white font-sans text-ink">
      <Nav
        wordmark="ReserveX"
        gap={30}
        links={[
          { href: '#why', label: 'Why tokenise' },
          { href: '#services', label: 'What we do' },
          { href: '#programme', label: 'How we deliver' },
          { href: '#assets', label: 'Assets' },
          { href: '#team', label: 'Team' },
          { href: TRADER_URL, label: 'ReserveX Trader' },
        ]}
        cta={{ href: '#contact', label: 'Start a conversation' }}
      />
      <main>
        <Hero />
        <Statement />
        <WhyTokenise />
        <BeforeAfter />
        <Services />
        <Programme />
        <BeyondSpeed />
        <Assets />
        <WhyNow />
        <Team />
        <Contact />
      </main>
      <Footer
        name="ReserveX"
        blurb="Tokenising African capital markets. ReserveX Labs Limited, 5th Floor, Crescent Business Centre, Off Parklands Road, Parklands, Nairobi."
        columns={[
          {
            title: 'Tokenisation',
            links: [
              { href: '#services', label: 'What we do' },
              { href: '#programme', label: 'How we deliver' },
              { href: '#assets', label: 'Assets' },
            ],
          },
          {
            title: 'Company',
            links: [
              { href: TRADER_URL, label: 'ReserveX Trader' },
              { href: '#team', label: 'Team' },
              { href: '#contact', label: 'Contact' },
            ],
          },
        ]}
        disclosure="ReserveX Labs Limited is licensed by the Capital Markets Authority of Kenya as an Intermediary Service Platform Provider, for its ReserveX Trader platform only. It is not licensed as a Token Issuance Platform Provider or virtual asset service provider in Kenya or any other market. Its Token Issuance Platform application with the Capital Markets Authority is under review, and token issuance services will be provided only once the applicable licence is granted in each market. Figures marked as industry estimates are illustrative and not a forecast. Nothing on this page is an offer or solicitation to buy any security or virtual asset. © 2026 ReserveX Labs Limited."
      />
    </div>
  );
}
