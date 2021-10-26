import React from 'react';
import Head from 'next/head';
import { createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';
import smoothscroll from 'smoothscroll-polyfill';

import { nexus, gtm } from '../config';
import Feedback from '../components/Feedback';
import GoogleAnalytics from '../components/GoogleAnalytics';

import '../styles/globals.scss';

if (typeof window === 'undefined') {
  require('abort-controller/polyfill');
} else {
  smoothscroll.polyfill();
  require('systemjs');
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

        <Feedback />

        {gtm.id && (
          <GoogleAnalytics />
        )}
      </>
    </NexusProvider>
  );
}

export default App;
