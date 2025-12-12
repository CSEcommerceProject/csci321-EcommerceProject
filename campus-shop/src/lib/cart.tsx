"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

export type CartItem = {
  id: number;
  title: string;
  priceCents: number;
  qty: number;
  imageUrl?: string;
};

type CartCtx = {
  items: CartItem[];
  loading: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  setQty: (id: number, qty: number) => Promise<void>;
  clear: () => Promise<void>;
  totalCents: number;
  discountPercent: number;
  setDiscount: (percent: number) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  const [items, setItems] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // --------------------------------------------------
  // 🔹 Load initial discount from localStorage
  // --------------------------------------------------
  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart:discount:v1");
      if (raw) setDiscountPercent(Number(raw));
    } catch {}
  }, []);

  // --------------------------------------------------
  // 🔹 Load Cart
  //  - unauthenticated → load from localStorage only
  //  - authenticated → load from server
  // --------------------------------------------------
  useEffect(() => {
    async function loadCart() {
      try {
        if (status === "unauthenticated") {
          // Load local cart
          const raw = localStorage.getItem("cart:v1");
          if (raw) setItems(JSON.parse(raw));
          setLoading(false);
          return;
        }

        if (status !== "authenticated") return;

        // Authenticated → fetch real cart
        const res = await fetch("/api/cart");
        if (!res.ok) throw new Error("Failed to fetch user cart");

        const data = await res.json();

        setItems(
          data.items?.map((it: any) => ({
            id: it.productId,
            title: it.product.title,
            priceCents: it.product.priceCents,
            qty: it.quantity,
            imageUrl: it.product.imageUrl,
          })) ?? []
        );
      } catch (err) {
        console.error("Cart load failed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, [status]);

  // --------------------------------------------------
  // 🔹 Persist cart + discount to localStorage
  // --------------------------------------------------
  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(items));
      localStorage.setItem("cart:discount:v1", String(discountPercent));
    } catch {}
  }, [items, discountPercent]);

  // --------------------------------------------------
  // 🔹 Helper to refresh from server
  // --------------------------------------------------
  async function refresh() {
    const res = await fetch("/api/cart");
    const data = await res.json();

    setItems(
      data.items?.map((it: any) => ({
        id: it.productId,
        title: it.product.title,
        priceCents: it.product.priceCents,
        qty: it.quantity,
        imageUrl: it.product.imageUrl,
      })) ?? []
    );
  }

  // --------------------------------------------------
  // 🔹 API Actions
  // --------------------------------------------------
  const api = useMemo<CartCtx>(
    () => ({
      items,
      loading,
      discountPercent,
      setDiscount: setDiscountPercent,

      totalCents: Math.round(
        items.reduce((s, it) => s + it.priceCents * it.qty, 0) *
          (1 - discountPercent / 100)
      ),

      async addItem(item, qty = 1) {
        await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: item.id, quantity: qty }),
        });
        await refresh();
      },

      async removeItem(id) {
        await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id }),
        });
        await refresh();
      },

      async setQty(id, qty) {
        await fetch("/api/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id, quantity: qty }),
        });
        await refresh();
      },

      async clear() {
        await fetch("/api/cart", { method: "DELETE" });
        setItems([]);
        setDiscountPercent(0);
      },
    }),
    [items, loading, discountPercent]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
