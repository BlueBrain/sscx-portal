export const accentColors: { [key: string]: string } = {
  yellow: '#ffc500',
  blue: '#84bbf8',
  lavender: '#657be1',
  green: '#33b080',
  grey: '#b2b3b3',
  orange: '#ed8048',
};

export const antBreakpoint = {
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
}

export const deploymentUrl = process.env.NEXT_PUBLIC_DEPLOYMENT_URL || 'https://bbp.epfl.ch';
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/sscx-portal';

export const isProduction = process.env.NODE_ENV === 'production';

export const nexus = {
  url: process.env.NEXT_PUBLIC_NEXUS_URL,

  org: process.env.NEXT_PUBLIC_NEXUS_ORG,
  project: process.env.NEXT_PUBLIC_NEXUS_PROJECT,

  token: process.env.NEXT_PUBLIC_NEXUS_TOKEN,

  defaultESViewId: encodeURIComponent('https://bbp.epfl.ch/neurosciencegraph/data/views/es/dataset'),
};

export const staticDataBaseUrl = process.env.NEXT_PUBLIC_STATIC_DATA_BASE_URL;
export const staticDataClusterBaseUrl = process.env.NEXT_PUBLIC_STATIC_DATA_CLUSTER_BASE_URL || staticDataBaseUrl;

export const gtm = {
  id: process.env.NEXT_PUBLIC_GTM_ID,
};
