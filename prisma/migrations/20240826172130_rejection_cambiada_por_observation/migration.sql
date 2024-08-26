/*
  Warnings:

  - You are about to drop the column `rejection` on the `Reservations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservations" DROP COLUMN "rejection",
ADD COLUMN     "observation" TEXT;
