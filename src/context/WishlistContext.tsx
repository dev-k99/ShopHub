import React, { createContext, useContext, ReactNode } from 'react';
import { Product } from '../types/product.types';
import { WishlistContextType } from '../types/wishlist.types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useLocalStorage<Product[]>('wishlist', []);
  const { showToast } = useToast();

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        showToast('Item already in wishlist', 'info');
        return prev;
      }
      showToast(`${product.title} added to wishlist`, 'success');
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => {
      const item = prev.find((item) => item.id === productId);
      if (item) {
        showToast(`${item.title} removed from wishlist`, 'info');
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared', 'info');
  };

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};