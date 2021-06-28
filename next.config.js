const { withSentryConfig } = require('@sentry/nextjs');
// https://docs.sentry.io/platforms/javascript/guides/nextjs/


const SentryWebpackPluginOptions = {
  silent: true,
};

const basePath = '/sscx-portal';

const nextConfig = withSentryConfig({
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: `${basePath}/`,
  images: {
    path: `${basePath}/_next/image`,
  },
  webpack5: true,
  images: {
    domains: ['localhost', 'sscx-portal-static-data'],
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
      source: '/(.*).(jpeg|png|webp)',
      headers: [{
        key: 'Cache-Control',
        value: 'public, max-age=259200, s-maxage=259200, stale-while-revalidate=259200',
      }],
    },];
  },
});


module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions);
