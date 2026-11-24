import { OG_SIZE, renderOgImage } from '@reservex/ui/og';

export const alt = 'The front door to Kenya’s capital markets.';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage({ name: 'ReserveX Trader', title: 'The front door to Kenya’s capital markets.' });
}
