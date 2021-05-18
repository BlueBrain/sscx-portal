import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: SENTRY_DSNprocess.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
});
