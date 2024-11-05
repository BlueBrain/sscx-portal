import React from 'react';
import Head from 'next/head';
import { createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';
import smoothscroll from 'smoothscroll-polyfill';

import { registerNexusFetchInterceptor } from '@/services/nexus';
import { nexus, gtm } from '../config';
import GoogleAnalytics from '../components/GoogleAnalytics';

import '../styles/globals.scss';


if (typeof(window) === 'undefined') {
  require('abort-controller/polyfill');
} else {
  registerNexusFetchInterceptor();
  smoothscroll.polyfill();
  require('systemjs/dist/s');
  require('systemjs/dist/extras/amd');
}

const nexusClient = createNexusClient({
  uri: nexus.url,
  token: nexus.token,
});

function App({ Component, pageProps }) {
  return (
    <NexusProvider nexusClient={nexusClient}>
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Component {...pageProps} />

        {gtm.id && (
          <GoogleAnalytics />
        )}
      </>
    </NexusProvider>
  );
}


export default App;
