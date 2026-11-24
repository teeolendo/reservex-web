import '@reservex/ui/globals.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { TRADER_URL } from '@reservex/ui';
import { fontVariables } from '@reservex/ui/fonts';
import { metadataBaseFrom } from '@reservex/ui/og';

const title = "ReserveX Trader — The front door to Kenya's capital markets";
const description =
  'Money market funds, unit trusts, ETFs, REITs, bonds and live NSE stocks. One app. Funded with the card in your wallet, from wherever you are in the world.';

export const metadata: Metadata = {
  metadataBase: metadataBaseFrom(TRADER_URL),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: 'ReserveX Trader', locale: 'en_GB', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

export const viewport: Viewport = { themeColor: '#14543C' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
