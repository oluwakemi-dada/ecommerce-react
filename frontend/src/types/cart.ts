import type { Product } from './product';

export type CartItem = Product & {
  qty: number;
};

export type AddCart = Product & {
  qty: number;
};

export type ShippingAddress = {
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
};

export type CartState = {
  cartItems: CartItem[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  shippingAddress: ShippingAddress;
  paymentMethod: 'PayPal';
};
