import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createNexusClient } from '@bbp/nexus-sdk';
import { NexusProvider } from '@bbp/react-nexus';

import routes from './routes';
import MainLayout from './layouts/MainLayout';
import { StoreProvider } from './Store';

const nexusClient = createNexusClient({
  uri: process.env.NEXUS_URL || 'https://bbp.epfl.ch/nexus/v1',
  token: process.env.NEXUS_TOKEN || undefined,
});

ReactDOM.render(
  <BrowserRouter>
    <NexusProvider nexusClient={nexusClient}>
      <StoreProvider>
        <MainLayout>
          {routes.map(props => (
            <Route key={props.path as string} {...props} />
          ))}
        </MainLayout>
      </StoreProvider>
    </NexusProvider>
  </BrowserRouter>,
  document.getElementById('app'),
);
