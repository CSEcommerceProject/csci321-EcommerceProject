import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// map URL slug -> enum
const slugToEnum = (slug?: string) => {
  switch ((slug ?? "").toLowerCase()) {
    case "laptops": return "LAPTOPS";
    case "computers-tablets": return "LAPTOPS";
    case "t-shirts": return "T_SHIRTS";
    case "sweatshirts": return "SWEATSHIRTS";
    case "hats": return "HATS";
    case "drinkware": return "DRINKWARE";
    case "tailgate-spirit": return "TAILGATE_SPIRIT";
    default: return undefined;
  }
};

// optional: for a small category nav strip
const CATS: { label: string; slug: string }[] = [
  { label: "All", slug: "" },
  { label: "Laptops", slug: "laptops" },
  { label: "T-shirts", slug: "t-shirts" },
  { label: "Sweatshirts", slug: "sweatshirts" },
  { label: "Hats", slug: "hats" },
  { label: "Drinkware", slug: "drinkware" },
  { label: "Computers & Tablets", slug: "computers-tablets" },
  { label: "Tailgate & Spirit", slug: "tailgate-spirit" },
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categoryEnum = slugToEnum(searchParams.category);

  const products = await prisma.product.findMany({
    where: {
      isApproved: true,
      ...(categoryEnum ? { category: categoryEnum as any } : {}),
    },
    orderBy: { id: "desc" },
  });

  const title = categoryEnum
    ? `Products • ${searchParams.category?.replace(/-/g, " ").toUpperCase()}`
    : "All Products";

  return (
    <section className="space-y-6">
      {/* header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white">{title}</h1>

        {/* category chips */}
        <nav className="flex flex-wrap gap-2">
          {CATS.map((c) => {
            const active = (searchParams.category ?? "") === c.slug || (!searchParams.category && c.slug === "");
            const href = c.slug ? `/products?category=${c.slug}` : "/products";
            return (
              <Link
                key={c.slug || "all"}
                href={href}
                className={[
                  "rounded-full px-3 py-1 text-sm transition",
                  active
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-white/80 text-gray-900 hover:bg-white"
                ].join(" ")}
              >
                {c.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* results */}
      {products.length === 0 ? (
        <p className="text-white/90">
          No products found{categoryEnum ? " in this category" : ""}.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="group overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={p.imageUrl}                // e.g. /products/hatter-cup1.webp
                  alt={p.imageAlt ?? p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
              </div>
              <div className="p-4">
                <div className="line-clamp-1 font-semibold text-gray-900">{p.title}</div>
                {p.description && (
                  <div className="mt-1 line-clamp-2 text-sm text-gray-600">{p.description}</div>
                )}
                <div className="mt-2 font-medium text-green-600">
                  ${(p.priceCents / 100).toFixed(2)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
