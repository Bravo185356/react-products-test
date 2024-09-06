type Product = {
  id: number;
  category: string;
  title: string;
  description: string;
  price: number | string;
  images: string[];
};

type ResponseProduct = {
  products: Product[],
  limit: number,
  skip: number,
  total: number
}

export type { Product, ResponseProduct };
