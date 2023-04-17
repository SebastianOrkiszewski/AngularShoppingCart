export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  quantity: number;
  rating: { rate: number; count: number };
  sum: number;
  title: string;
  total: number;
}
