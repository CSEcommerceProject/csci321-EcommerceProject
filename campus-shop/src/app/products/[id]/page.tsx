import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const dummy = {
    1: { id: 1, title: "Campus Hoodie", description: "Cozy hoodie", priceCents: 4500 },
    2: { id: 2, title: "Sticker Pack", description: "5 stickers", priceCents: 700 },
  } as const;

  const product = dummy[params.id as "1" | "2"];
  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p>{product.description}</p>
      <div className="text-lg">${(product.priceCents / 100).toFixed(2)}</div>
      <AddToCartButton id={product.id} title={product.title} priceCents={product.priceCents} />
    </section>
  );
}

