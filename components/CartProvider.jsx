'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'threads-cart-v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); } catch { setItems([]); }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = (product, size = 'M') => setItems((current) => {
    const key = `${product.slug}-${size}`;
    const existing = current.find((item) => item.key === key);
    return existing ? current.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { key, slug: product.slug, name: product.name, price: product.price, image: product.image, color: product.color, size, quantity: 1 }];
  });
  const updateQuantity = (key, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.key !== key) : current.map((item) => item.key === key ? { ...item, quantity } : item));
  const removeItem = (key) => setItems((current) => current.filter((item) => item.key !== key));
  const clearCart = () => setItems([]);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const value = useMemo(() => ({ items, addItem, updateQuantity, removeItem, clearCart, itemCount, subtotal }), [items, itemCount, subtotal]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
