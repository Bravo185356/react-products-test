import { Button } from 'antd';
import classes from './AppHeader.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';

export const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isCreatePage = useMemo(() => {
    return location.pathname === '/create-product' ? true : false;
  }, [location]);

  return (
    <header className={classes.header}>
      <div>Products App</div>
      <Button
        onClick={() => navigate(isCreatePage ? '/products' : '/create-product')}
        type='primary'
      >
        {isCreatePage ? 'К списку' : 'Создать'}
      </Button>
    </header>
  );
};
