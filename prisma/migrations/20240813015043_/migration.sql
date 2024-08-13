/*
  Warnings:

  - You are about to drop the column `dni` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_dni_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dni",
ALTER COLUMN "spiritualName" DROP NOT NULL;
