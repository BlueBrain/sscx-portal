const { withSentryConfig } = require('@sentry/nextjs');
// https://docs.sentry.io/platforms/javascript/guides/nextjs/


const basePath = '/sscx-portal';

module.exports = withSentryConfig({
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: `${basePath}/`,
  images: {
    path: `${basePath}/_next/image`,
  },
  future: {
    webpack5: true,
  },
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
    return [];
  },
});
