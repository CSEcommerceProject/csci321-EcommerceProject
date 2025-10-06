"use client";
import Link from "next/link";

const CATEGORIES = [
  { label: "T-shirts", slug: "t-shirts" },
  { label: "Sweatshirts", slug: "sweatshirts" },
  { label: "Hats", slug: "hats" },
  { label: "Drinkware", slug: "drinkware" },
  { label: "Computers & Tablets", slug: "computers-tablets" },
  { label: "Tailgate & Spirit", slug: "tailgate-spirit" },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl py-12 px-4">
      <h2 className="mb-8 text-center text-3xl font-extrabold text-white">
        Shop Categories
      </h2>

      {/* 3 columns on large, 2 on medium, 1 on small */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${encodeURIComponent(c.slug)}`}
            className="flex h-32 items-center justify-center border-4 border-green-700 bg-white
                       text-gray-900 font-extrabold text-2xl rounded-md
                       hover:bg-green-700 hover:text-white transition-all duration-200"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
