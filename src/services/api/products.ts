import { BASE_URL } from '../../constants';
import { Product, ResponseProduct } from '../../types/types';

export class ProductsApi {
  static async getProducts(query: string) {
    try {
      const response = await fetch(`${BASE_URL}${query}`);
      const data: ResponseProduct = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  static async getProductById(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data: Product = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
