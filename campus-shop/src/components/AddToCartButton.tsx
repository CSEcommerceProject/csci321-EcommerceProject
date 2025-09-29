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
