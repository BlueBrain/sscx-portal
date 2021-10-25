import dynamic from 'next/dynamic';

const GoogleAnalyticsLazy = dynamic(() => import('./GoogleAnalytics'), { ssr: false });

export default GoogleAnalyticsLazy;
