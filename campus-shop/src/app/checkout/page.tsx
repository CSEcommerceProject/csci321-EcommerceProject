"use client";
import { useCart } from "@/lib/cart";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalCents, clear } = useCart();
  const router = useRouter();

  const placeOrder = async () => {
    // For now, just clear cart and show a basic confirmation
    // (Later: POST to /api/orders and persist to DB)
    clear();
    alert("Order placed! (stub)");
    router.push("/");
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Checkout</h1>

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

          <button onClick={placeOrder} className="rounded bg-black px-4 py-2 text-white">
            Place Order
          </button>
        </>
      )}
    </section>
  );
}
