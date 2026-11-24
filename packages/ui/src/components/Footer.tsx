import type { ReactNode } from 'react';
import { Mark } from './Mark';
import type { NavLinkItem } from './types';

type FooterProps = {
  name: string;
  blurb: ReactNode;
  columns: Array<{ title: string; links: NavLinkItem[] }>;
  disclosure: ReactNode;
};

export function Footer({ name, blurb, columns, disclosure }: FooterProps) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto box-border flex max-w-container flex-wrap justify-between gap-12 px-8 pb-12 pt-16">
        <div className="max-w-[420px] flex-[1_1_320px]">
          <div className="flex items-center gap-[10px]">
            <Mark size={28} />
            <span className="font-semibold">{name}</span>
          </div>
          <p className="m-0 mt-5 text-[14px] leading-[1.7] text-subtle">{blurb}</p>
        </div>
        <div className="flex flex-wrap gap-16">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3 text-[15px]">
              <span className="font-semibold text-ink">{col.title}</span>
              {col.links.map((l) => (
                <a key={l.href + l.label} className="navlink" href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto box-border max-w-container px-8 pb-14">
        <p className="m-0 border-t border-line pt-7 text-[13px] leading-[1.7] text-subtle">{disclosure}</p>
      </div>
    </footer>
  );
}
