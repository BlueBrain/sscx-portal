const { withSentryConfig } = require('@sentry/nextjs');
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const withBundleAnalyzer = require('@next/bundle-analyzer') ({
  enabled: process.env.ANALYZE === 'true',
})


const SentryWebpackPluginOptions = {
  silent: true,
};

const basePath = '/sscx-portal';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: `${basePath}/`,
  webpack5: true,
  images: {
    domains: [
      'localhost',
      'sscx-portal-static-data',
      'sscx-portal.kcp.bbp.epfl.ch',
      'sscx-portal-dev.kcp.bbp.epfl.ch'
    ],
    path: `${basePath}/_next/image/`,
    minimumCacheTTL: 259200,
  },
  sentry: {
    hideSourceMaps: true,
  },
  output: 'standalone',
  experimental: {
    esmExternals: true,
  },
  async redirects() {
    return [
      {
        source: '/experimental-data',
        destination: '/experimental-data/layer-anatomy',
        permanent: false,
      },
      {
        source: '/reconstruction-data',
        destination: '/reconstruction-data/brain-regions',
        permanent: false,
      },
      {
        source: '/digital-reconstructions',
        destination: '/digital-reconstructions/brain-regions',
        permanent: false,
      },
      {
        source: '/validations',
        destination: '/validations/brain-regions',
        permanent: false,
      },
      {
        source: '/predictions',
        destination: '/predictions/brain-regions',
        permanent: false,
      },
    ]
  },
  async headers() {
    return [{
      source: '/(.*).(jpg|png|webp)',
      headers: [{
        key: 'Cache-Control',
        value: 'public, max-age=259200, s-maxage=259200, stale-while-revalidate=259200',
      }],
    },];
  },
};


module.exports = withBundleAnalyzer(withSentryConfig(nextConfig, SentryWebpackPluginOptions));
