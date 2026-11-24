const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static in production. On AWS, CloudFront routes /api/* to the waitlist Lambda (see docs/DEPLOY.md).
  output: isDev ? undefined : 'export',
  images: { unoptimized: true },
  transpilePackages: ['@reservex/ui'],
  poweredByHeader: false,
  // Local dev only: proxy the waitlist API to services/waitlist's dev server.
  ...(isDev && {
    async rewrites() {
      const port = process.env.WAITLIST_DEV_PORT ?? '3100';
      return [{ source: '/api/waitlist', destination: `http://127.0.0.1:${port}/api/waitlist` }];
    },
  }),
};

export default nextConfig;
