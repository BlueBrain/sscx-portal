import { staticDataBaseUrl, staticDataClusterBaseUrl, basePath, nexus } from '../config';
import { saveAs } from 'file-saver';


interface ParsedNexusUrl {
  deployment: string;
  entityType: string;
  org: string;
  project: string;
  schema: string;
  id: string;
}

const nexusEntities = [
  'orgs',
  'projects',
  'acls',
  'views',
  'resources',
  'files',
];

const nexusUrlR = new RegExp(
  [
    '^',
    '(https?://.+)', // nexus deployment
    '/',
    `(${nexusEntities.join('|')})`, // entity type
    '/',
    '([^/]+)', // org
    '/',
    '([^/]+)', // proj
    '/?',
    '([^/]+)?', // schema [optional]
    '/?',
    '([^/]+)?', // id [optional]
    '/?',
    '$',
  ].join(''),
);

/**
 * @author pgetta
 * With given Nexus URL (might be self/project/id url), return it's:
 * * deployment URL
 * * entity type
 * * org label
 * * project label
 * * id
 *
 * @param nexusUrl
 */
export const parseUrl = (nexusUrl: string): ParsedNexusUrl => {
  if (!nexusUrl) throw new Error('selfUrl should be defined');

  const mulEntityTypeR = new RegExp(`(${nexusEntities.join('|')})`, 'g');
  const mulEntityTypeMatch = nexusUrl.match(mulEntityTypeR);
  if (mulEntityTypeMatch && mulEntityTypeMatch.length > 1) {
    throw new Error(
      'Url contains multiple entity types which is not supported',
    );
  }

  const matches = nexusUrl.match(nexusUrlR);
  if (!matches || matches.length <= 5) {
    throw new Error('Error while parsing selfUrl');
  }

  return {
    deployment: matches[1],
    entityType: matches[2].slice(0, -1),
    org: matches[3],
    project: matches[4],
    schema: matches[5],
    id: matches[6],
  };
};

type OptImgUrlParams = {
  width?: 640 | 750 | 828 | 1080 | 1200 | 1920 | 2048 | 3840;
  quality?: number;
}

export function imgOpt(url: string, params?: OptImgUrlParams) {
  const width = params?.width || 1080;
  const quality = params?.quality || 75;

  const imgUrl = url.startsWith(staticDataBaseUrl)
    ? url.replace(staticDataBaseUrl, staticDataClusterBaseUrl)
    : url;

  return `${basePath}/_next/image/?url=${encodeURIComponent(imgUrl)}&w=${width}&q=${quality}`;
};


export function downloadAsJson(data, name) {
  const dataBlob = new Blob([JSON.stringify(data)]);
  saveAs(dataBlob, name);
};


type ApiGroupType = 'resource' | 'file' | 'view' | 'resolver';

export type ComposeUrlParams = {
  schema?: string | null;
  rev?: number;
  source?: boolean;
  org?: string;
  project?: string;
  viewType?: 'es' | 'sparql';
  sync?: boolean;
  idExpand?: boolean;
  tag?: string;
};

const ViewTypeMap = {
  es: '_search',
  sparql: 'sparql',
};

export const revParamRegexp = /\?rev=\d+$/;

/**
  Assembles Nexus API URL
*/
export function composeUrl(apiGroupType: ApiGroupType, id: string, params?: ComposeUrlParams) {
  const {
    rev,
    schema = '_',
    source = false,
    org = nexus.org,
    project = nexus.project,
    viewType,
    sync = false,
    tag = undefined,
  } = params ?? {};

  // if id has revision and revision is passed as attribute remove to avoid collision
  const revLessId = rev && id.includes('?rev=') ? id.replace(revParamRegexp, '') : id;
  const uriEncodedId = encodeURIComponent(revLessId);

  const pathname = [
    `${apiGroupType}s`,
    org,
    project,
    apiGroupType === 'resource' || apiGroupType === 'resolver' ? schema : null,
    uriEncodedId,
    source ? 'source' : null,
    viewType ? ViewTypeMap[viewType] : null,
  ]
    .filter(Boolean)
    .join('/');

  const searchParams = new URLSearchParams();

  if (rev) {
    searchParams.set('rev', rev.toString());
  }
  if (tag) {
    searchParams.set('tag', tag);
  }

  if (sync) {
    searchParams.set('indexing', 'sync');
  }

  const searchParamsStr = searchParams.toString();

  return [nexus.url, '/', pathname, searchParamsStr ? `?${searchParamsStr}` : null]
    .filter(Boolean)
    .join('');
}

export function ensureArray(value: any | any[]): any[] {
  return Array.isArray(value) ? value : [value];
}
