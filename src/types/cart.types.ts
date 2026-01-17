import type { Product } from './product.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  getItemQuantity: (productId: number) => number;
}