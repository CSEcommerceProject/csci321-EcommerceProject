-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priceCents" INTEGER NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "ownerId" INTEGER,
    CONSTRAINT "Product_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("category", "description", "id", "imageAlt", "imageUrl", "isApproved", "ownerId", "priceCents", "title") SELECT "category", "description", "id", "imageAlt", "imageUrl", "isApproved", "ownerId", "priceCents", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
