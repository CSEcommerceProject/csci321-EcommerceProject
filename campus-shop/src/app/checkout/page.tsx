// src/app/checkout/page.tsx
"use client";
import React from "react";
import { useCart } from "@/lib/cart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, totalCents, clear, discountPercent, removeItem } = useCart();
  const router = useRouter();

  const placeOrder = () => {
    clear();
    alert("Order placed! 🎉");
    router.push("/");
  };

  if (!items || items.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="text-center p-10 bg-white rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-orange-600">Your cart is empty 😢</h1>
          <p className="text-orange-500">Add some products to checkout!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-orange-50 py-10">
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-green-50 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold border-b-4 border-green-400 pb-4 mb-6 text-green-800">
          Checkout 🛒
        </h1>

        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow hover:shadow-lg transition relative"
            >
              <div className="flex items-center gap-4">
                {item.imageUrl && (
                  <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-200 shadow-sm">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow">
                      {item.qty}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="font-semibold text-lg text-gray-800">{item.title}</h2>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-1 text-red-600 hover:text-red-800 font-medium transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <span className="font-bold text-gray-900 text-lg">
                ${(item.priceCents * item.qty / 100).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        {/* Discount link */}
        {!discountPercent && (
          <div className="text-right">
            <Link
              href="/discount"
              className="text-blue-600 underline hover:text-blue-800 font-medium"
            >
              Apply Student Discount
            </Link>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center bg-green-100 p-6 rounded-2xl shadow-inner">
          <div className="text-xl font-semibold text-green-900">
            Total: ${(totalCents / 100).toFixed(2)}
            {discountPercent > 0 && (
              <span className="text-green-700 ml-2 font-bold">
                ({discountPercent}% Student Discount!)
              </span>
            )}
          </div>
          <button
            onClick={placeOrder}
            className="mt-4 sm:mt-0 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-8 rounded-xl text-lg font-bold shadow-md transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
}
