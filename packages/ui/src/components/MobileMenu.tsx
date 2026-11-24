'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { NavLinkItem } from './types';

/** Phone-width replacement for the wrapping nav: a menu button and a sheet with the same links. */
export function MobileMenu({ links, cta }: { links: NavLinkItem[]; cta: NavLinkItem }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center gap-2 rounded-pill border border-border-strong bg-white px-4 text-[15px] font-medium text-brand"
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {open ? (
            <>
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
        {open ? 'Close' : 'Menu'}
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute inset-x-0 top-full z-50 border-b border-line bg-white shadow-hero"
      >
        <ul className="m-0 flex list-none flex-col px-8 pb-6 pt-2">
          {links.map((l) => (
            <li key={l.href + l.label} className="border-b border-line">
              <a className="navlink flex min-h-[52px] items-center text-[17px]" href={l.href} onClick={close}>
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-5">
            <a
              className="btn-primary box-border flex min-h-[52px] items-center justify-center rounded-pill bg-brand px-7 text-[16px] font-medium text-white"
              href={cta.href}
              onClick={close}
            >
              {cta.label}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
