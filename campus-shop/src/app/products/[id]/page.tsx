import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";
import OutOfStockRequestForm from "@/components/OutOfStockRequestForm";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (Number.isNaN(id)) return notFound();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || !product.isApproved) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
          <Image
            src={product.imageUrl}
            alt={product.imageAlt ?? product.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          {product.description && (
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          )}
          <div className="text-2xl font-semibold text-green-600">
            ${(product.priceCents / 100).toFixed(2)}
          </div>

          {/* show add-to-cart only if in stock */}
          {product.inStock ? (
            <AddToCartButton
              id={product.id}
              title={product.title}
              priceCents={product.priceCents}
            />
          ) : (
            <p className="text-sm text-red-600">Currently out of stock.</p>
          )}

          {/* show request form only when not in stock */}
          {!product.inStock && (
            <OutOfStockRequestForm
              productId={product.id}
              productTitle={product.title}
            />
          )}
        </div>
      </div>
    </main>
  );
}
