import React, { createContext, useContext, type ReactNode, useMemo } from 'react';
import type { Product } from '../types/product.types';
import type { Cart, CartItem, CartContextType } from '../types/cart.types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);
  const { showToast } = useToast();

  const cart: Cart = useMemo(() => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    return {
      items: cartItems,
      totalItems,
      totalPrice,
    };
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);

      if (existingItem) {
        showToast(`Updated ${product.title} quantity`, 'success');
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      showToast(`${product.title} added to cart`, 'success');
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => {
      const item = prev.find((item) => item.product.id === productId);
      if (item) {
        showToast(`${item.product.title} removed from cart`, 'info');
      }
      return prev.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Cart cleared', 'info');
  };

  const isInCart = (productId: number): boolean => {
    return cartItems.some((item) => item.product.id === productId);
  };

  const getItemQuantity = (productId: number): number => {
    const item = cartItems.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};