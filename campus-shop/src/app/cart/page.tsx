/*
"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";

export default function CartPage() {
  const { items, setQty, removeItem, totalCents, loading } = useCart();

  

  if (items.length === 0) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/products" className="underline">
          Browse products
        </Link>
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
              <div className="text-sm text-gray-600">
                ${(it.priceCents / 100).toFixed(2)} each
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
                className="rounded border px-3 py-1"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center text-lg">
        <span>Total</span>
        <span className="font-semibold">${(totalCents / 100).toFixed(2)}</span>
      </div>

      <Link
        href="/checkout"
        className="inline-block rounded bg-black px-4 py-2 text-white"
      >
        Go to Checkout
      </Link>
    </section>
  );
}
*/
"use client";
import { useCart } from "@/lib/cart";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { items, setQty, removeItem, totalCents, loading } = useCart();
  const [checking, setChecking] = useState(false);
  const [discountMsg, setDiscountMsg] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  if (loading) return <p>Loading your cart...</p>;

  if (items.length === 0) {
    return (
      <section className="space-y-3">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link href="/products" className="underline">
          Browse products
        </Link>
      </section>
    );
  }

  async function checkDiscount() {
    try {
      setChecking(true);
      setDiscountMsg(null);
      const res = await fetch("/api/discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.eligible) {
        setDiscount(data.discountPercent);
        setDiscountMsg(`🎉 You qualify for a Stetson student discount of ${data.discountPercent}%`);
      } else {
        setDiscount(0);
        setDiscountMsg("❌ No discount available for this account.");
      }
    } catch (err) {
      console.error(err);
      setDiscountMsg("⚠️ Could not check discount right now.");
    } finally {
      setChecking(false);
    }
  }

  const discountedTotal = discount > 0 ? totalCents * (1 - discount / 100) : totalCents;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      <ul className="space-y-2">
        {items.map(it => (
          <li key={it.id} className="flex items-center justify-between gap-4 rounded border bg-white p-3">
            <div>
              <div className="font-medium">{it.title}</div>
              <div className="text-sm text-gray-600">
                ${(it.priceCents / 100).toFixed(2)} each
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
                className="rounded border px-3 py-1"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center text-lg">
        <span>Total</span>
        <div className="text-right">
          <div>${(totalCents / 100).toFixed(2)}</div>
          {discount > 0 && (
            <div className="text-green-600 text-sm">
              - {discount}% = ${(discountedTotal / 100).toFixed(2)}
            </div>
          )}
        </div>
      </div>

      <div className="rounded bg-gray-50 p-3 space-y-2">
        <p className="text-sm text-gray-700">
          Check if you qualify for a Stetson student discount.
        </p>
        <button
          onClick={checkDiscount}
          disabled={checking}
          className="rounded bg-black px-3 py-1 text-sm text-white disabled:opacity-60"
        >
          {checking ? "Checking..." : "Check Discount"}
        </button>

        {discountMsg && (
          <p
            className={`text-sm ${
              discountMsg.includes("🎉")
                ? "text-green-600 font-semibold"
                : "text-red-500"
            }`}
          >
            {discountMsg}
          </p>
        )}
      </div>

      <Link
        href="/checkout"
        className="inline-block rounded bg-black px-4 py-2 text-white"
      >
        Go to Checkout
      </Link>
    </section>
  );
}
