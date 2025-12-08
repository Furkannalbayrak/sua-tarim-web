export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  unit: 'kg' | 'adet';
  is_popular: boolean
}