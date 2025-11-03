import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

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

const CATS = [
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
  searchParams: Promise<{ category?: string }>;
}) {
  const sp = await searchParams; // ⬅️ await first
  const categoryEnum = slugToEnum(sp.category);

  const products = await prisma.product.findMany({
    where: { isApproved: true, ...(categoryEnum ? { category: categoryEnum as any } : {}) },
    orderBy: { id: "desc" },
  });

  const title = categoryEnum
    ? `Products • ${sp.category?.replace(/-/g, " ").toUpperCase()}`
    : "All Products";

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <nav className="flex flex-wrap gap-2">
          {CATS.map((c) => {
            const active = (sp.category ?? "") === c.slug || (!sp.category && c.slug === "");
            const href = c.slug ? `/products?category=${c.slug}` : "/products";
            return (
              <Link
                key={c.slug || "all"}
                href={href}
                className={[
                  "rounded-full px-3 py-1 text-sm transition",
                  active ? "bg-yellow-400 text-gray-900" : "bg-white/80 text-gray-900 hover:bg-white",
                ].join(" ")}
              >
                {c.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {products.length === 0 ? (
        <p className="text-white/90">
          No products found{categoryEnum ? " in this category" : ""}.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.id}`} className="group overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
              <div className="relative h-48 w-full">
                <Image src={p.imageUrl} alt={p.imageAlt ?? p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <div className="line-clamp-1 font-semibold text-gray-900">{p.title}</div>
                {p.description && <div className="mt-1 line-clamp-2 text-sm text-gray-600">{p.description}</div>}
                <div className="mt-2 font-medium text-green-600">${(p.priceCents / 100).toFixed(2)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
