import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { ProductsPage } from '../pages/ProductsPage/ProductsPage';
import { CreateProductPage } from '../pages/CreateProductPage/CreateProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductPage />,
      },
      {
        path: 'create-product',
        element: <CreateProductPage />
      }
    ],
  },
], {
  basename: '/react-products-test/',
});

export { router };
