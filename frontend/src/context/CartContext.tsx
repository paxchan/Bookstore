import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined); // CartContext is initally undefined

// anything within the CartProvider tags has access to the functions
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add items to cart. Take into account the price and quantity
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);

      if (existingItem) {
        return prevCart.map((c) =>
          c.bookID === item.bookID
            ? {
                ...c,
                quantity: c.quantity + item.quantity,
                subtotal: c.subtotal + item.subtotal,
              }
            : c
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  // remove item from cart
  const removeFromCart = (bookID: number) => {
    console.log('Removing book with ID:', bookID);
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
  };

  // clears the cart
  const clearCart = () => {
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// custom hook to access the cart context values
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
