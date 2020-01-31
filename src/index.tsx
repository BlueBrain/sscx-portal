import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import routes from './routes';
import MainLayout from './layouts/MainLayout';

ReactDOM.render(
  <BrowserRouter>
    <MainLayout>
      {routes.map(props => (
        <Route key={props.path as string} {...props} />
      ))}
    </MainLayout>
  </BrowserRouter>,
  document.getElementById('app'),
);
