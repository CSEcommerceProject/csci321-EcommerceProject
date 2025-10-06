/* eslint-disable no-console */
/* eslint-disable no-console */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Clear existing products (optional)
  await prisma.product.deleteMany();

  const products = [
    // 🧃 Cups / Drinkware
    ...Array.from({ length: 10 }, (_, i) => ({
      title: `Hatter Cup ${i + 1}`,
      description: "Stylish insulated cup perfect for hot or cold drinks.",
      priceCents: 1800 + i * 100,
      isApproved: true,
      category: "DRINKWARE",
      imageUrl: `/products/hatter-cup${i + 1}.webp`,
      imageAlt: `Hatter cup ${i + 1}`,
    })),

    // 🎩 Hats
    ...Array.from({ length: 8 }, (_, i) => ({
      title: `Hatter Hat ${i + 1}`,
      description: "Comfortable hat featuring the Stetson Hatter logo.",
      priceCents: 2000 + i * 100,
      isApproved: true,
      category: "HATS",
      imageUrl: `/products/hatter-hat${i + 1}.webp`,
      imageAlt: `Hatter hat ${i + 1}`,
    })),

    // 💻 PCs / Laptops
    ...Array.from({ length: 10 }, (_, i) => ({
      title: `Campus Laptop ${i + 1}`,
      description: "Reliable laptop for students and professionals alike.",
      priceCents: 89900 + i * 500,
      isApproved: true,
      category: "LAPTOPS",
      imageUrl: `/products/PC${i + 1}.webp`,
      imageAlt: `Laptop ${i + 1}`,
    })),

    // 👕 T-shirts
    ...Array.from({ length: 10 }, (_, i) => ({
      title: `Stetson Shirt ${i + 1}`,
      description: "Soft cotton T-shirt with official university logo.",
      priceCents: 2500 + i * 50,
      isApproved: true,
      category: "T_SHIRTS",
      imageUrl: `/products/stetson-shirt${i + 1}.webp`,
      imageAlt: `Stetson shirt ${i + 1}`,
    })),

    // 🧥 Sweatshirts
    ...Array.from({ length: 8 }, (_, i) => ({
      title: `Stetson Sweatshirt ${i + 1}`,
      description: "Warm sweatshirt made with premium cotton blend.",
      priceCents: 4500 + i * 50,
      isApproved: true,
      category: "SWEATSHIRTS",
      imageUrl: `/products/stetson-sweatshirt${i + 1}.webp`,
      imageAlt: `Stetson sweatshirt ${i + 1}`,
    })),
  ];

  await prisma.product.createMany({ data: products });
  console.log(`✅ Seeded ${products.length} products with images.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
