import './styles/reset.scss';
import './styles/default.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import Routes from './app.routes';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <HashRouter>
        <Routes />
      </HashRouter>
    </React.StrictMode>
  );
}
