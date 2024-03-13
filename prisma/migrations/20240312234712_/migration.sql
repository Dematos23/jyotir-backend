/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `Dni` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dni_dni_key" ON "Dni"("dni");
