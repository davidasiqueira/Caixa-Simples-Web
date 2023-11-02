
export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  userId: string;
  productCode?: number;
  category: 'comida' | 'bebida' | 'doce' | 'outros';
}