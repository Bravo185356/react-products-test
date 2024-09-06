import { useEffect, useState } from 'react';
import { ProductsApi } from '../services/api/products';
import { Product } from '../types/types';


export const useFetchProductItem = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchProductItem() {
    setIsLoading(true);
    const product = await ProductsApi.getProductById(id);
    if (product) {
      setProduct(product);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchProductItem();
  }, [id]);

  return { product, setProduct, isLoading };
};
