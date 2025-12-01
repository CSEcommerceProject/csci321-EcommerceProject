// src/lib/cart.tsx
"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { id: number; title: string; priceCents: number; qty: number;  imageUrl?: string; };

type CartCtx = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  totalCents: number;
  discountPercent: number;
  setDiscount: (percent: number) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  // persist to localStorage (persist discount too)
  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(items));
      localStorage.setItem("cart:discount:v1", String(discountPercent));
    } catch {}
  }, [items, discountPercent]);

  // restore discount on mount (optional)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart:discount:v1");
      if (raw) setDiscountPercent(Number(raw));
    } catch {}
  }, []);

  const api = useMemo<CartCtx>(
    () => ({
      items,
      addItem: (item, qty = 1) => {
        setItems((prev) => {
          const i = prev.findIndex((p) => p.id === item.id);
          if (i === -1) return [...prev, { ...item, qty }];
          const next = [...prev];
          next[i] = { ...next[i], qty: next[i].qty + qty };
          return next;
        });
      },
      removeItem: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          prev
            .map((p) => (p.id === id ? { ...p, qty: Math.max(0, qty) } : p))
            .filter((p) => p.qty > 0)
        ),
      clear: () => {
        setItems([]);
        setDiscountPercent(0);
      },

      // total after discount (rounded to nearest cent)
      totalCents: Math.round(
        items.reduce((s, it) => s + it.priceCents * it.qty, 0) * (1 - discountPercent / 100)
      ),

      discountPercent,
      setDiscount: setDiscountPercent,
    }),
    [items, discountPercent]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
