import Link from "next/link";

export default async function ProductsPage() {
  // Temporary hardcoded list (replace later with DB fetch)
  const products = [
    { id: 1, title: "Campus Hoodie", priceCents: 4500 },
    { id: 2, title: "Sticker Pack", priceCents: 700 },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map(p => (
        <Link
          key={p.id}
          href={`/products/${p.id}`}
          className="rounded border bg-white p-4 hover:shadow"
        >
          <div className="font-medium">{p.title}</div>
          <div className="text-sm">${(p.priceCents / 100).toFixed(2)}</div>
        </Link>
      ))}
    </section>
  );
}
