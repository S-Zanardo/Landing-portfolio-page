import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

interface ComicCartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const ComicCartContext = createContext<ComicCartContextType | undefined>(undefined);

export function ComicCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <ComicCartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}
    >
      {children}
    </ComicCartContext.Provider>
  );
}

export function useComicCart() {
  const context = useContext(ComicCartContext);
  if (context === undefined) {
    throw new Error('useComicCart must be used within a ComicCartProvider');
  }
  return context;
}
