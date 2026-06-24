-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_created_at_id_idx" ON "Product"("created_at" DESC, "id" DESC);

-- CreateIndex
CREATE INDEX "Product_category_created_at_id_idx" ON "Product"("category", "created_at" DESC, "id" DESC);
