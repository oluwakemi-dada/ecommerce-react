import { type Product } from './product';

export type CartItem = Product & {
  qty: number;
};

export type CartState = {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
};
