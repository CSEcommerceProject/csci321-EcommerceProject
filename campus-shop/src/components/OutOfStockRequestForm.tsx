"use client";

import { useState } from "react";

export default function OutOfStockRequestForm({
  productId,
  productTitle,
}: {
  productId: number;
  productTitle: string;
}) {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/out-of-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          productName: productTitle,
          note,
          email, // if user is signed in, API will ignore this
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <p className="text-sm text-green-600">
        Thanks — your request has been received.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-2 rounded bg-gray-50 p-3">
      <p className="text-sm font-medium text-gray-900">
        Can’t find this item or it’s out of stock? Tell us.
      </p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Your email (required if not signed in)"
        className="w-full rounded border p-2 text-sm"
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        placeholder="Any note (size, color, date)..."
        className="w-full rounded border p-2 text-sm"
      />
      <button
        disabled={loading}
        className="rounded bg-black px-3 py-1 text-sm text-white disabled:opacity-60"
      >
        {loading ? "Sending..." : "Submit request"}
      </button>
    </form>
  );
}
