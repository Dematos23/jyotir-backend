/*
  Warnings:

  - You are about to drop the column `ambiente` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `ambienteAsignado` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ambienteSolicitado` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reserva" DROP COLUMN "ambiente",
ADD COLUMN     "ambienteAsignado" "Ambiente" NOT NULL,
ADD COLUMN     "ambienteSolicitado" "Ambiente" NOT NULL,
ALTER COLUMN "clientName" DROP NOT NULL;
