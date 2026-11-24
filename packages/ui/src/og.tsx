import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

// Build-time only (metadata image routes). satori needs woff/ttf, so we read
// the @fontsource files installed in the calling app rather than next/font's woff2.
async function font(pkg: string, file: string) {
  return readFile(join(process.cwd(), 'node_modules', '@fontsource', pkg, 'files', file));
}

export const OG_SIZE = { width: 1200, height: 630 };

/** Text-on-green social card. */
export async function renderOgImage({ name, title }: { name: string; title: string }) {
  const [newsreader, inter] = await Promise.all([
    font('newsreader', 'newsreader-latin-400-normal.woff'),
    font('inter', 'inter-latin-600-normal.woff'),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#14543C',
          padding: '72px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: 999,
            background: '#F4C25B',
            opacity: 0.9,
            top: -120,
            right: -70,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 340,
            height: 340,
            borderRadius: 999,
            background: '#1B6649',
            bottom: -190,
            left: -110,
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: '#FFFFFF',
              color: '#14543C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Newsreader',
              fontSize: 36,
            }}
          >
            X
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: 30, color: '#FFFFFF', letterSpacing: '-0.3px' }}>{name}</div>
        </div>
        <div
          style={{
            fontFamily: 'Newsreader',
            fontSize: 88,
            lineHeight: 1.02,
            letterSpacing: '-2px',
            color: '#FFFFFF',
            maxWidth: 940,
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Newsreader', data: newsreader, weight: 400, style: 'normal' },
        { name: 'Inter', data: inter, weight: 600, style: 'normal' },
      ],
    },
  );
}

/** The "X" mark: green rounded square, white Newsreader X. */
export async function renderIcon(size: number) {
  const newsreader = await font('newsreader', 'newsreader-latin-500-normal.woff');
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#14543C',
          borderRadius: Math.round(size * (9 / 32)),
          color: '#FFFFFF',
          fontFamily: 'Newsreader',
          fontSize: Math.round(size * 0.72),
          lineHeight: 1,
          paddingBottom: Math.round(size * 0.04),
        }}
      >
        X
      </div>
    ),
    { width: size, height: size, fonts: [{ name: 'Newsreader', data: newsreader, weight: 500, style: 'normal' }] },
  );
}

/** Metadata base from an env URL; tolerates the bracketed placeholders. */
export function metadataBaseFrom(url: string): URL | undefined {
  try {
    return new URL(url);
  } catch {
    return undefined;
  }
}
