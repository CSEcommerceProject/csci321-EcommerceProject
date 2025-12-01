"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

export type CartItem = { id: number; title: string; priceCents: number; qty: number };

type CartCtx = {
  items: CartItem[];
  loading: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  setQty: (id: number, qty: number) => Promise<void>;
  clear: () => Promise<void>;
  totalCents: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch cart for authenticated users + merge local storage items
  useEffect(() => {
    async function loadCart() {
      try {
        // Wait until the user is authenticated
        if (status !== "authenticated") {
          if (status === "unauthenticated") setLoading(false);
          return;
        }

        // 🧩 Merge any locally stored items (pre-login) into the server cart
        const local = localStorage.getItem("cart:v1");
        if (local) {
          const localItems = JSON.parse(local);
          for (const it of localItems) {
            await fetch("/api/cart", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ productId: it.id, quantity: it.qty }),
            });
          }
          localStorage.removeItem("cart:v1");
        }

        // 🔹 Fetch server cart after merging
        const res = await fetch("/api/cart");
        if (!res.ok) throw new Error("Failed to fetch user cart");
        const data = await res.json();

        setItems(
          data.items?.map((it: any) => ({
            id: it.productId,
            title: it.product.title,
            priceCents: it.product.priceCents,
            qty: it.quantity,
          })) ?? []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, [status]);

  // 🔹 Helper to refresh cart after changes
  async function refresh() {
    const res = await fetch("/api/cart");
    const data = await res.json();
    setItems(
      data.items?.map((it: any) => ({
        id: it.productId,
        title: it.product.title,
        priceCents: it.product.priceCents,
        qty: it.quantity,
      })) ?? []
    );
  }

  // 🔹 Define API
  const api = useMemo<CartCtx>(
    () => ({
      items,
      loading,
      totalCents: items.reduce((s, it) => s + it.priceCents * it.qty, 0),

      async addItem(item, qty = 1) {
        if (status !== "authenticated") {
          // Not logged in → store locally
          const raw = localStorage.getItem("cart:v1");
          const existing = raw ? JSON.parse(raw) : [];
          const idx = existing.findIndex((p: any) => p.id === item.id);
          if (idx === -1) existing.push({ ...item, qty });
          else existing[idx].qty += qty;
          localStorage.setItem("cart:v1", JSON.stringify(existing));
          setItems(existing);
          return;
        }

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
      },
    }),
    [items, loading, status]
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
