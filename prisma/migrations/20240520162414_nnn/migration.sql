-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deni" (
    "id" SERIAL NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "UserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" DECIMAL(9,2) NOT NULL,
    "totalPrice" DECIMAL(9,2) NOT NULL,
    "price" DECIMAL(9,2) NOT NULL,
    "date" TEXT NOT NULL DEFAULT '2023-12-17',
    "time" TEXT NOT NULL DEFAULT '00:00',
    "month" TEXT NOT NULL DEFAULT '1',
    "year" TEXT NOT NULL DEFAULT '2024',
    "ppi" DECIMAL(9,2) NOT NULL DEFAULT 0,
    "profit" DECIMAL(9,2) NOT NULL DEFAULT 0,

    CONSTRAINT "Deni_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deni" ADD CONSTRAINT "Deni_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deni" ADD CONSTRAINT "Deni_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
