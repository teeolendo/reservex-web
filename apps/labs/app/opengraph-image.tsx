import { OG_SIZE, renderOgImage } from '@reservex/ui/og';

export const alt = 'Tokenising African capital markets.';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage({ name: 'ReserveX', title: 'Tokenising African capital markets.' });
}
