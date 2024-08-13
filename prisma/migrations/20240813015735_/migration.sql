/*
  Warnings:

  - You are about to drop the `Dni` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserReserva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserReserva` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserReserva" DROP CONSTRAINT "UserReserva_reservaId_fkey";

-- DropForeignKey
ALTER TABLE "UserReserva" DROP CONSTRAINT "UserReserva_userId_fkey";

-- DropForeignKey
ALTER TABLE "_UserReserva" DROP CONSTRAINT "_UserReserva_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserReserva" DROP CONSTRAINT "_UserReserva_B_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- DropTable
DROP TABLE "Dni";

-- DropTable
DROP TABLE "Reserva";

-- DropTable
DROP TABLE "UserReserva";

-- DropTable
DROP TABLE "_UserReserva";

-- DropEnum
DROP TYPE "Ambiente";

-- DropEnum
DROP TYPE "Canal";

-- DropEnum
DROP TYPE "Estados";

-- DropEnum
DROP TYPE "Implementos";
