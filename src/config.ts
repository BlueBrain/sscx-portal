export const accentColors: { [key: string]: string } = {
  yellow: '#ffc500',
  blue: '#84bbf8',
  lavender: '#657be1',
  green: '#33b080',
  grey: '#b2b3b3',
  orange: '#ed8048',
};

export const sscx = {
  org: 'public',
  project: 'sscx',
  datasetViewId: encodeURIComponent('https://bbp.epfl.ch/neurosciencegraph/data/views/es/dataset'),
};

export const deploymentUrl = 'https://bbp.epfl.ch';
export const basePath = '/sscx-portal';

export const isServer = typeof window === 'undefined';

export const nexus = {
  url: process.env.NEXT_PUBLIC_NEXUS_URL,
  token: process.env.NEXT_PUBLIC_NEXUS_TOKEN,
};

export const nexusPluginBaseUrl = process.env.NEXT_PUBLIC_NEXUS_PLUGIN_BASE_URL;

export const staticDataBaseUrl = process.env.NEXT_PUBLIC_STATIC_DATA_BASE_URL;

export const staticDataCredentials = process.env.NEXT_PUBLIC_STATIC_DATA_CREDENTIALS;

export const feedbackUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL;
