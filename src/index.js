import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { ContextProvider } from './components/CustomContext';

import App from './App';
import store from './store';

createRoot(document.getElementById('root')).render(
  <ContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ContextProvider>,
)
