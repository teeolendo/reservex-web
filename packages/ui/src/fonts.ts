import { Inter, Newsreader } from 'next/font/google';

// Self-hosted at build time by next/font: no runtime request to Google.
export const display = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal'],
  variable: '--font-display',
  display: 'swap',
});

export const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontVariables = `${display.variable} ${sans.variable}`;
