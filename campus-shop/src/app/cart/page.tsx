
"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { items, setQty, removeItem, totalCents, loading } = useCart();

  

  if (items.length === 0) {
    return (
      <section className="space-y-3 p-6">
        <h1 className="text-2xl font-bold text-green-800">Your Cart</h1>
        <p>Cart is empty.</p>
        <Link href="/products" className="underline text-blue-600">
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4 p-6">
      <h1 className="text-2xl font-bold text-green-800">Your Cart</h1>
      <ul className="space-y-2">
        {items.map((it) => (
          <li
            key={it.id}
            className="flex items-center justify-between gap-4 border-b py-2"
          >
            <div className="flex items-center gap-3">
              {it.imageUrl && (
                <Image
                  src={it.imageUrl}
                  alt={it.title}
                  width={50}
                  height={50}
                  className="rounded object-cover"
                />
              )}
              <div>
                <div className="font-medium">{it.title}</div>
                <div className="text-sm text-gray-600">
                  ${(it.priceCents / 100).toFixed(2)} each
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={it.qty}
                onChange={e => setQty(it.id, Number(e.target.value))}
                className="w-16 rounded border p-1"
              />
              <button
                onClick={() => removeItem(it.id)}
                className="rounded border px-3 py-1 bg-red-100 hover:bg-red-200"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between text-lg mt-4">
        <span>Total</span>
        <span className="font-semibold">${(totalCents / 100).toFixed(2)}</span>
      </div>

      <Link
        href="/checkout"
        className="inline-block mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Go to Checkout
      </Link>
    </section>
  );
}
