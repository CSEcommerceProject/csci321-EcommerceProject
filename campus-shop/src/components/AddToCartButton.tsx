

/*
"use client";
import { useCart } from "@/lib/cart";

export default function AddToCartButton(props: { id: number; title: string; priceCents: number }) {
  const { addItem } = useCart();
  return (
    <button
      onClick={() => addItem({ id: props.id, title: props.title, priceCents: props.priceCents }, 1)}
      className="rounded bg-black px-4 py-2 text-white"
    >
      Add to cart
    </button>
  );
}
*/

// "@/components/AddToCartButton.tsx"
"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function AddToCartButton(props: { id: number; title: string; priceCents: number }) {
  const { addItem } = useCart();
  const [message, setMessage] = useState<string | null>(null);

  const handleAdd = () => {
    // add to cart
    addItem(
      { id: props.id, title: props.title, priceCents: props.priceCents },
      1
    );

    // show success message
    setMessage("Item has been added to cart");

    // hide after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleAdd}
        className="rounded bg-black px-4 py-2 text-white hover:bg-gray-900"
      >
        Add to cart
      </button>

      {message && (
        <p className="text-sm text-green-600">{message}</p>
      )}
    </div>
  );
}
