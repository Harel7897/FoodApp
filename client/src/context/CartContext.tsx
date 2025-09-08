import React, { createContext, useContext, useMemo, useState } from 'react';
import type { MenuItem } from '../types';


type CartItem = { item: MenuItem; qty: number };


type CartState = {
items: CartItem[];
add: (item: MenuItem) => void;
remove: (id: string) => void;
clear: () => void;
total: number;
};


const Ctx = createContext<CartState | undefined>(undefined);


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [items, setItems] = useState<CartItem[]>([]);
const add = (item: MenuItem) => setItems(prev => {
const idx = prev.findIndex(ci => ci.item._id === item._id);
if (idx >= 0) { const copy = [...prev]; copy[idx] = { item, qty: copy[idx].qty + 1 }; return copy; }
return [...prev, { item, qty: 1 }];
});
const remove = (id: string) => setItems(prev => prev.filter(ci => ci.item._id !== id));
const clear = () => setItems([]);
const total = useMemo(() => items.reduce((sum, ci) => sum + ci.item.price * ci.qty, 0), [items]);
return <Ctx.Provider value={{ items, add, remove, clear, total }}>{children}</Ctx.Provider>;
};


export const useCart = () => {
const ctx = useContext(Ctx); if (!ctx) throw new Error('useCart must be used within CartProvider');
return ctx;
};