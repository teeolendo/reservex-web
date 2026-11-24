import type { ReactNode } from 'react';
import { cn } from '../cn';
import { Mark } from './Mark';
import { MobileMenu } from './MobileMenu';
import type { NavLinkItem } from './types';

type NavProps = {
  wordmark: ReactNode;
  links: NavLinkItem[];
  cta: NavLinkItem;
  /** Gap between desktop links in px (Trader 32, tokenisation 30). */
  gap?: 30 | 32;
};

export function Nav({ wordmark, links, cta, gap = 32 }: NavProps) {
  return (
    <header className="relative border-b border-line">
      <nav
        aria-label="Main"
        className="mx-auto box-border flex max-w-container flex-wrap items-center justify-between gap-5 px-8 py-[22px]"
      >
        <a href="#top" className="flex items-center gap-[10px] text-ink hover:text-ink">
          <Mark />
          <span className="text-[17px] font-semibold tracking-[-0.01em]">{wordmark}</span>
        </a>
        <div className={cn('hidden flex-wrap items-center md:flex', gap === 32 ? 'gap-8' : 'gap-[30px]')}>
          {links.map((l) => (
            <a key={l.href + l.label} className="navlink" href={l.href}>
              {l.label}
            </a>
          ))}
          <a
            className="btn-primary box-border inline-flex min-h-[44px] items-center rounded-pill bg-brand px-5 py-3 text-[15px] font-medium text-white"
            href={cta.href}
          >
            {cta.label}
          </a>
        </div>
        <MobileMenu links={links} cta={cta} />
      </nav>
    </header>
  );
}
