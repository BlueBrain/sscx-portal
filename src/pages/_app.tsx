import React from 'react';
import Head from 'next/head';
import { createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';

import { nexus, basePath } from '../config';
import MainLayout from '../layouts/MainLayout';

import '../styles/globals.scss';

if (typeof(window)) {
  require('abort-controller/polyfill');
}


const nexusClient = createNexusClient({
  uri: nexus.url,
  token: nexus.token,
});

function MyApp({ Component, pageProps }) {
  return (
    <NexusProvider nexusClient={nexusClient}>
      <MainLayout>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap" />
          <script src="https://www.unpkg.com/systemjs@6.1.7/dist/system.js"></script>
          <script src="https://www.unpkg.com/systemjs@6.1.7/dist/extras/named-exports.js"></script>
          <script type="systemjs-importmap" src={`${basePath}/systemjs-importmap.json`}></script>
        </Head>
        <Component {...pageProps} />
      </MainLayout>
    </NexusProvider>
  );
}

export default MyApp;
