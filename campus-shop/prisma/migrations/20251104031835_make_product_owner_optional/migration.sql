/*
  Warnings:

  - You are about to drop the column `sellerId` on the `Product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "OutOfStockRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requesterEmail" TEXT NOT NULL,
    "requesterName" TEXT,
    "productId" INTEGER,
    "productName" TEXT,
    "note" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "OutOfStockRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

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
    "ownerId" INTEGER,
    CONSTRAINT "Product_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("category", "description", "id", "imageAlt", "imageUrl", "isApproved", "priceCents", "title") SELECT "category", "description", "id", "imageAlt", "imageUrl", "isApproved", "priceCents", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
