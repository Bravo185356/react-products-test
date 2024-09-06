import { useState } from 'react';
import { AppSidebar } from '../../components/AppSidebar/AppSidebar';
import { ProductList } from '../../components/ProductList/ProductList';
import classes from './Products.module.scss';

export const ProductsPage = () => {
  const [showOnlyFavorite, setShowOnlyFavorite] = useState(false);
  const [debounceValue, setDebounceValue] = useState('');
  
  return (
    <section className={classes.products}>
      <AppSidebar
        setDebounceValue={setDebounceValue}
        showOnlyFavorite={showOnlyFavorite}
        setShowOnlyFavorite={setShowOnlyFavorite}
      />
      <ProductList
        debounceValue={debounceValue}
        showOnlyFavorite={showOnlyFavorite}
      />
    </section>
  );
};
