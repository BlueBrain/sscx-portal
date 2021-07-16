import React from 'react';
import Head from 'next/head';
import { createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';
import smoothscroll from 'smoothscroll-polyfill';

import { nexus, basePath, isServer } from '../config';
import MainLayout from '../layouts/MainLayout';
import Feedback from '../components/Feedback';
import GoogleAnalytics from '../components/GoogleAnalytics';

import '../styles/globals.scss';

if (isServer) {
  require('abort-controller/polyfill');
} else {
  smoothscroll.polyfill();
}


const nexusClient = createNexusClient({
  uri: nexus.url,
  token: nexus.token,
});

function MyApp({ Component, pageProps }) {
  return (
    <NexusProvider nexusClient={nexusClient}>
      <MainLayout>
        {/* TODO: move all head elements to a separate component */}
        <Head>
          {/* eslint-disable-next-line */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400;700&display=swap" />
          <script src="https://www.unpkg.com/systemjs@6.1.7/dist/system.js" />
          <script src="https://www.unpkg.com/systemjs@6.1.7/dist/extras/named-exports.js" />
          <script type="systemjs-importmap" src={`${basePath}/systemjs-importmap.json`} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Feedback />
        <GoogleAnalytics />

        <Component {...pageProps} />
      </MainLayout>
    </NexusProvider>
  );
}

export default MyApp;
