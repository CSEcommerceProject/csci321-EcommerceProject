const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async () => {
  const products = await prisma.product.findMany({ where: { imageUrl: null } });
  await Promise.all(
    products.map((p) =>
      prisma.product.update({
        where: { id: p.id },
        data: {
          imageUrl: "/products/placeholder.jpg",
          imageAlt: p.title,
        },
      })
    )
  );
  console.log("✅ Backfilled imageUrl for", products.length, "products");
  await prisma.$disconnect();
})();
