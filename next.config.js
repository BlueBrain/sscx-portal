const withBundleAnalyzer = require('@next/bundle-analyzer') ({
  enabled: process.env.ANALYZE === 'true',
})

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/sscx-portal';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  basePath: basePath,
  assetPrefix: `${basePath}/`,
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    esmExternals: true,
  },
};


module.exports = withBundleAnalyzer(nextConfig);
