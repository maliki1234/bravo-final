/*
  Warnings:

  - Added the required column `CustomerId` to the `Deni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deni" ADD COLUMN     "CustomerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Deni" ADD CONSTRAINT "Deni_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
