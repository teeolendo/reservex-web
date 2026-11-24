import '@reservex/ui/globals.css';
import './globals.css';
import type { ReactNode } from 'react';
import { fontVariables } from '@reservex/ui/fonts';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
