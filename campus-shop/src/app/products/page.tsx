import { prisma } from "@/lib/prisma";
import ProductListClient from "./ProductListClient";

// Convert URL slug -> category enum
const slugToEnum = (slug?: string) => {
  switch ((slug ?? "").toLowerCase()) {
    case "laptops":
    case "computers-tablets":
      return "LAPTOPS";
    case "t-shirts":
      return "T_SHIRTS";
    case "sweatshirts":
      return "SWEATSHIRTS";
    case "hats":
      return "HATS";
    case "drinkware":
      return "DRINKWARE";
    case "tailgate-spirit":
      return "TAILGATE_SPIRIT";
    default:
      return undefined;
  }
};

// Category navigation
const CATS: { label: string; slug: string }[] = [
  { label: "All", slug: "" },
  { label: "Laptops", slug: "laptops" },
  { label: "T-shirts", slug: "t-shirts" },
  { label: "Sweatshirts", slug: "sweatshirts" },
  { label: "Hats", slug: "hats" },
  { label: "Drinkware", slug: "drinkware" },
];

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const categoryEnum = slugToEnum(searchParams.category);

  const products = await prisma.product.findMany({
    where: { isApproved: true, ...(categoryEnum ? { category: categoryEnum as any } : {}) },
    orderBy: { id: "desc" },
  });

  return (
    <section className="space-y-6 p-6">
      {/* Category Navigation */}
      <nav className="flex flex-wrap gap-2 mb-4">
        {CATS.map((c) => {
          const active = (searchParams.category ?? "") === c.slug || (!searchParams.category && c.slug === "");
          const href = c.slug ? `/products?category=${c.slug}` : "/products";
          return (
            <a
              key={c.slug || "all"}
              href={href}
              className={`rounded-full px-3 py-1 text-sm transition ${
                active
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-white/80 text-gray-900 hover:bg-white"
              }`}
            >
              {c.label}
            </a>
          );
        })}
      </nav>

      {/* Product List */}
      <ProductListClient products={products} searchParams={searchParams} />
    </section>
  );
}
