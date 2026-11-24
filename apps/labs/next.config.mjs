/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: ['@reservex/ui'],
  poweredByHeader: false,
};

export default nextConfig;
