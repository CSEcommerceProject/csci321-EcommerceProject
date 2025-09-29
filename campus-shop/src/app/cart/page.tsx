"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function CartPage() {
  const { items, setQty, removeItem, totalCents } = useCart();

  if (items.length === 0) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p>Cart is empty.</p>
        <Link href="/products" className="underline">Browse products</Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <ul className="space-y-2">
        {items.map(it => (
          <li key={it.id} className="flex items-center justify-between gap-4 rounded border bg-white p-3">
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-sm">${(it.priceCents / 100).toFixed(2)} each</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={it.qty}
                onChange={(e) => setQty(it.id, Number(e.target.value))}
                className="w-16 rounded border p-1"
              />
              <button onClick={() => removeItem(it.id)} className="rounded border px-3 py-1">Remove</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between text-lg">
        <span>Total</span>
        <span className="font-semibold">${(totalCents / 100).toFixed(2)}</span>
      </div>

      <Link href="/checkout" className="inline-block rounded bg-black px-4 py-2 text-white">
        Go to Checkout
      </Link>
    </section>
  );
}
