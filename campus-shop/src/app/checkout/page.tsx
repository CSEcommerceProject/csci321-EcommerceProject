"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart"; // adjust import

export default function CheckoutPage() {
  const { items, totalCents, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function placeOrder() {
    try {
      setLoading(true);
      setError(null);

      const cartItems = items.map(it => ({ productId: it.id, quantity: it.qty }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Order failed");
      }

      const { order } = await res.json();

      // 1) mark success FIRST (so UI swaps to success view)
      setSuccess(true);
      setOrderId(order?.id ?? null);

      // 2) then clear cart (won't affect success view)
      clear();
    } catch (e: any) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Success view is independent of cart contents
  if (success) {
    return (
      <section className="mx-auto max-w-lg space-y-4 rounded-lg border bg-green-50 p-6 text-green-900">
        <h1 className="text-2xl font-bold">✅ Order placed successfully!</h1>
        {orderId ? (
          <p>Your order number is <span className="font-semibold">#{orderId}</span>.</p>
        ) : (
          <p>Your order has been received.</p>
        )}
        <p>You’ll get an update when it’s being prepared.</p>
        <a href="/products" className="inline-block rounded bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700">
          Continue shopping
        </a>
      </section>
    );
  }

  return (
    <section className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {error && (
        <div className="rounded bg-red-100 p-3 text-red-700">{error}</div>
      )}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {items.map(it => (
              <li key={it.id} className="flex justify-between rounded border bg-white p-3">
                <span>{it.title} × {it.qty}</span>
                <span>${((it.priceCents * it.qty) / 100).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between text-lg">
            <span>Total</span>
            <span className="font-semibold">${(totalCents / 100).toFixed(2)}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </>
      )}
    </section>
  );
}
