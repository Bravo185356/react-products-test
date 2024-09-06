import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { router } from './router/index.tsx';
import { RouterProvider } from 'react-router-dom';
import './assets/styles/nullstyle.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import './assets/styles/main.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);