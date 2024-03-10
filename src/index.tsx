// import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app';
import config from "./config";
// import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from './services/i18n/context';
import { ServicesContext } from './services/context';
import Services from './services';

const services = new Services(config);

const root = createRoot(document.getElementById('root')!);

root.render(
  // <Provider store={services.redux}>
    <ServicesContext.Provider value={services}>
      <I18nProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </ServicesContext.Provider>
  // </Provider>
);
