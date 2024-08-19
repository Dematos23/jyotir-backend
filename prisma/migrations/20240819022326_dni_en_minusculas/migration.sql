/*
  Warnings:

  - You are about to drop the column `Dni` on the `Clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[dni]` on the table `Clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dni` to the `Clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Clients_Dni_key";

-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "Dni",
ADD COLUMN     "dni" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Clients_dni_key" ON "Clients"("dni");
