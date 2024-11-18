"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartContextType {
  cartTotal: number;
  setCartTotal: (total: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartTotal, setCartTotal] = useState(0);

  const updateCartTotal = (total: number) => {
    console.log("Updating cart total:", total);
    setCartTotal(total);
  };

  return (
    <CartContext.Provider value={{ cartTotal, setCartTotal: updateCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};