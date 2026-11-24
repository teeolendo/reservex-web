import '@reservex/ui/globals.css';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { LABS_URL } from '@reservex/ui';
import { fontVariables } from '@reservex/ui/fonts';
import { metadataBaseFrom } from '@reservex/ui/og';

const title = 'ReserveX — Tokenising African capital markets';
const description =
  'The full-service tokenisation partner for Africa’s fund managers and issuers. Advisory, structuring, licensing, engineering, distribution and liquidity, delivered by one team, from blueprint to launch.';

export const metadata: Metadata = {
  metadataBase: metadataBaseFrom(LABS_URL),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: 'ReserveX', locale: 'en_GB', title, description },
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
