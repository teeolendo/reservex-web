import type { ReactNode } from 'react';

function Fact({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="flex items-center gap-[10px]">
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#1F9D6B"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon}
      </svg>
      {children}
    </span>
  );
}

export function TrustStrip() {
  return (
    <section aria-label="Key facts" className="border-y border-line">
      <div className="mx-auto box-border flex max-w-container flex-wrap justify-between gap-6 p-8 text-[15px] text-muted">
        <Fact
          icon={
            <>
              <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
              <path d="M9 12l2 2 4-4" />
            </>
          }
        >
          CMA-licensed platform
        </Fact>
        <Fact
          icon={
            <>
              <rect x="4" y="10" width="16" height="10" rx="2" />
              <path d="M8 10V7a4 4 0 018 0v3" />
            </>
          }
        >
          We never hold your money
        </Fact>
        <Fact
          icon={
            <>
              <path d="M3 12h18" />
              <path d="M12 3a14 14 0 010 18" />
              <path d="M12 3a14 14 0 000 18" />
              <circle cx="12" cy="12" r="9" />
            </>
          }
        >
          Invest from anywhere
        </Fact>
        <Fact
          icon={
            <>
              <path d="M4 19V5" />
              <path d="M4 19h16" />
              <path d="M8 15l4-4 3 3 5-6" />
            </>
          }
        >
          Live NSE prices
        </Fact>
      </div>
    </section>
  );
}
