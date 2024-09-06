import { BASE_URL } from '../../constants';

export class CategoriesApi {
  static async getAllCategories() {
    try {
      const response = await fetch(`${BASE_URL}/category-list`);
      const data: string[] = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
