"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  description?: string;
  priceCents: number;
  imageUrl: string;
  imageAlt?: string;
};

export default function ProductListClient({
  products,
  searchParams,
}: {
  products: Product[];
  searchParams: { category?: string };
}) {
  const { addItem, cart } = useCart();
  const [addedQuantities, setAddedQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    // Sync local state with cart
    const quantities: { [key: number]: number } = {};
    (cart || []).forEach((item: any) => {
      quantities[item.id] = item.quantity;
    });
    setAddedQuantities(quantities);
  }, [cart]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);

    setAddedQuantities((prev) => ({
      ...prev,
      [product.id]: prev[product.id] ? prev[product.id] + 1 : 1,
    }));
  };

  return (
    <section className="space-y-6">
      {products.length === 0 ? (
        <p className="text-gray-700">No products found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const quantity = addedQuantities[product.id] || 0;
            const alreadyAdded = quantity > 0;

            return (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition"
              >
                {/* Product Image */}
                <div className="relative h-48 w-full">
                  <Image
                    src={product.imageUrl}
                    alt={product.imageAlt ?? product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col gap-2">
                  <div className="line-clamp-1 font-semibold text-gray-900">{product.title}</div>
                  {product.description && (
                    <div className="text-sm text-gray-600 line-clamp-2">{product.description}</div>
                  )}
                  <div className="mt-1 font-medium text-green-600">
                    ${(product.priceCents / 100).toFixed(2)}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`mt-2 w-full rounded px-3 py-2 text-white font-medium transition-transform duration-150 ${
                      alreadyAdded ? "bg-black scale-105" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {alreadyAdded ? `Added (${quantity})` : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
