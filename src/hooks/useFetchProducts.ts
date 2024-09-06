import { useEffect, useState } from 'react';
import { ProductsApi } from '../services/api/products';
import { getQueryString } from '../components/utils/getQueryString';
import { useAppDispatch } from '../store/hooks';
import { setProductList } from '../store/productsSlice/productsSlice';

interface useFetchProductsProps {
  skip: number;
  limit: number;
  category: string | null;
}

export const useFetchProducts = (query: useFetchProductsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  async function fetchProducts() {
    setIsLoading(true);
    const queryString = getQueryString(query);
    const products = await ProductsApi.getProducts(queryString);
    if (products) {
      dispatch(setProductList(products));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  }, [query.skip, query.limit, query.category]);

  return { isLoading };
};
