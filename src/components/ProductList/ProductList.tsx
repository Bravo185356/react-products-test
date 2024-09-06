import { ProductCard } from '../ProductCard/ProductCard';
import classes from './ProductList.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '../Pagination/Pagination';
import { useFetchProducts } from '../../hooks/useFetchProducts';
import { useAppSelector } from '../../store/hooks';
import { Loader } from '../../ui/Loader/Loader';
import { useEffect, useMemo } from 'react';

interface ProductListProps {
  // в API нету поиска по названию. При наличии добавляем debounceValue к зависимостям хука useFetchProducts
  debounceValue: string;
  showOnlyFavorite: boolean;
}

export const ProductList = ({ debounceValue, showOnlyFavorite }: ProductListProps) => {
  const [searchParams] = useSearchParams();

  const { products, total, skip, limit } = useAppSelector((state) => state.products);
  const favoriteProducts = useAppSelector((state) => state.favoriteProducts.favorites);

  const { isLoading } = useFetchProducts({ skip, limit, category: searchParams.get('category') });

  useEffect(() => {
    console.log(debounceValue)
  }, [debounceValue])

  const productList = useMemo(() => {
    return showOnlyFavorite ? favoriteProducts : products;
  }, [showOnlyFavorite, favoriteProducts, products]);
  
  return (
    <div className={classes.productContent}>
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {productList.length > 0 && (
            <>
              <div className={classes.productList}>
                {productList.map((product) => {
                  return (
                    <ProductCard
                      skip={skip}
                      key={product.id}
                      product={product}
                    />
                  );
                })}
              </div>
              {!showOnlyFavorite && productList.length && (
                <Pagination
                  total={total}
                  skip={skip}
                />
              )}
            </>
          )}
          {productList.length === 0 && <div className={classes.emptyList}>Список пуст</div>}
        </>
      )}
    </div>
  );
};
