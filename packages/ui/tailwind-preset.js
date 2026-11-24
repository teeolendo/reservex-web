/**
 * ReserveX design tokens (HANDOFF.md §4), shared by both apps.
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#14543C', hover: '#0C3B29' },
        ink: { DEFAULT: '#10241B', soft: '#2A3A32' },
        muted: '#3E5249',
        subtle: '#5B6E65',
        mint: '#1F9D6B',
        positive: '#1A7A54',
        tint: '#EEF6F1',
        wash: '#F6FAF8',
        line: '#EDF2EF',
        border: { DEFAULT: '#E3ECE7', strong: '#CFE3D8', hover: '#B9D6C6' },
        'on-brand': { DEFAULT: '#FFFFFF', muted: '#D7E8DF', subtle: '#BFD8CC' },
        accent: 'var(--accent)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Newsreader', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        tile: '14px',
        card: '24px',
        'card-lg': '28px',
        panel: '36px',
      },
      boxShadow: {
        hero: '0 30px 60px -30px rgba(16,36,27,0.25)',
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        section: '144px',
      },
    },
  },
  plugins: [],
};
