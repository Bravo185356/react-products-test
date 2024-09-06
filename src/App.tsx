import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { CategoriesApi } from './services/api/categories';
import { setCategories } from './store/categoriesSlice/categoriesSlice';

function App() {
  const dispatch = useAppDispatch();
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/products');
    }
    getCategoryList();
  });

  async function getCategoryList() {
    const categories = await CategoriesApi.getAllCategories();

    if (categories) {
      dispatch(setCategories(categories));
    }
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
