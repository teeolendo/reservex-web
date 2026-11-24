import type { ReactNode } from 'react';

/** 48px tint tile holding a 24px stroke icon. Decorative. */
export function IconTile({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-tile bg-tint">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#14543C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </div>
  );
}
