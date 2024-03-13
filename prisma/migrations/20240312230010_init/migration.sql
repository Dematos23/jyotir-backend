/*
  Warnings:

  - You are about to drop the column `role` on the `Dni` table. All the data in the column will be lost.
  - Added the required column `rol` to the `Dni` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dni" DROP COLUMN "role",
ADD COLUMN     "rol" "Rol" NOT NULL;
