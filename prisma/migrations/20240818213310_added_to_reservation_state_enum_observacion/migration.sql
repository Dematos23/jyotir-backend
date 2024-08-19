-- AlterEnum
ALTER TYPE "ReservationState" ADD VALUE 'OBSERVACION';

-- AlterTable
ALTER TABLE "Reservations" ADD COLUMN     "rejection" TEXT;
