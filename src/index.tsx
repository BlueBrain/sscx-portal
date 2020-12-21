import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';

import routes from './routes';
import MainLayout from './layouts/MainLayout';

import 'antd/lib/style/css';
import './assets/styles/app.global.less'


const importMap = `{
  "imports": {
    "react": "https://unpkg.com/react@16.12.0/umd/react.production.min.js",
    "react-dom": "https://unpkg.com/react-dom@16.12.0/umd/react-dom.production.min.js"
  }
}
`;

document.write(`<script type="systemjs-importmap">${importMap}</script>`);


const nexusClient = createNexusClient({
  uri: process.env.NEXUS_URL || 'https://bbp.epfl.ch/nexus/v1',
  token: process.env.NEXUS_TOKEN || undefined,
});

ReactDOM.render(
  <BrowserRouter>
    <NexusProvider nexusClient={nexusClient}>
      <MainLayout>
        <Suspense fallback={null}>
          {routes.map(props => (
            <Route key={props.path as string} {...props} />
          ))}
        </Suspense>
      </MainLayout>
    </NexusProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
