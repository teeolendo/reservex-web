import type { ReactNode } from 'react';

/** Hero status pill with a mint dot. */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-pill bg-tint px-[14px] py-2 text-[13px] font-medium text-brand">
      <span aria-hidden="true" className="h-[7px] w-[7px] rounded-pill bg-mint" />
      {children}
    </div>
  );
}
