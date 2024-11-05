import { nexus, basePath } from '@/config';

const originalFetch = typeof window !== 'undefined' ? window.fetch : undefined;

export function registerNexusFetchInterceptor() {
  window.fetch = async function fetchWithInterceptor(...args) {
    const [url, options] = args;

    if (typeof url !== 'string') return originalFetch(url, options);

    if (!url.startsWith(nexus.url)) {
      return originalFetch(url, options);
    }

    // POST requests (ES queries).

    if (options?.method === 'POST') {
      const urlObj = new URL(url);

      // TODO: implementation of the following is not complete

      // const query = JSON.parse(options.body);

      return originalFetch(url, options);

    }

    // The rest are GET requests

    // Serving files from static storage
    if (url.includes('/files/')) {
      const urlObj = new URL(url);
      const fileId = decodeURIComponent(urlObj.pathname.split('/').at(-1));
      const fileUUID = fileId.split('/').at(-1);

      const subDir = options?.headers && 'Accept' in options.headers && ['json'].some(type => options.headers['Accept'].includes(type))
        ? 'file-meta'
        : 'files';

      const fileUrl = `${basePath}/static-nexus-data/${subDir}/${fileUUID}`;

      // const nexusBuffer = Buffer.from(await (await originalFetch(url, options)).arrayBuffer());
      // const fileBuffer = Buffer.from(await (await originalFetch(fileUrl)).arrayBuffer());

      // if (Buffer.compare(nexusBuffer, fileBuffer) !== 0) {
      //   console.log('Nexus buffer is not equal to file buffer');
      //   console.log(options?.headers);
      //   console.log('Nexus url:', url);
      //   console.log('File url:', fileUrl);

      //   return originalFetch(url, options);
      // }

      return originalFetch(fileUrl);
    }

    // Serving resources from static storage
    if (url.includes('/resources/')) {
      const urlObj = new URL(url);

      const isIncomingResource = urlObj.pathname.includes('/incoming');
      const resourceId = decodeURIComponent(urlObj.pathname.replace('/incoming', '').split('/').at(-1));
      const resourceUUID = resourceId.split('/').at(-1);

      const subDir = isIncomingResource ? 'incoming' : 'resources';

      const resourceUrl = `${basePath}/static-nexus-data/${subDir}/${resourceUUID}`;

      // const nexusResourceBuffer = Buffer.from(await (await originalFetch(url, options)).arrayBuffer());
      // const localResourceBuffer = Buffer.from(await (await originalFetch(resourceUrl)).arrayBuffer());

      // if (Buffer.compare(nexusResourceBuffer, localResourceBuffer) !== 0) {
      //   console.log('Nexus buffer is not equal to resource buffer');
      //   console.log(options?.headers);
      //   console.log('Nexus url:', url);
      //   console.log('Resource url:', resourceUrl);

      //   return originalFetch(url, options);
      // }

      return originalFetch(resourceUrl, options);
    }
  };}
