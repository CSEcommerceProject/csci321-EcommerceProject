export default function ProductDetail({ params }: { params: { id: string } }) {
  // Replace with DB lookup later
  const dummy = {
    1: { title: "Campus Hoodie", description: "Cozy hoodie for students", priceCents: 4500 },
    2: { title: "Sticker Pack", description: "Set of 5 laptop stickers", priceCents: 700 },
  };

  const product = dummy[params.id as "1" | "2"];

  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p>{product.description}</p>
      <div className="text-lg">${(product.priceCents / 100).toFixed(2)}</div>
      <button className="rounded bg-black px-4 py-2 text-white">Add to cart</button>
    </section>
  );
}
