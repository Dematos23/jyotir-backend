/*
  Warnings:

  - You are about to drop the `ClientsReservations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersReservations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientsReservations" DROP CONSTRAINT "ClientsReservations_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ClientsReservations" DROP CONSTRAINT "ClientsReservations_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "UsersReservations" DROP CONSTRAINT "UsersReservations_reservationId_fkey";

-- DropForeignKey
ALTER TABLE "UsersReservations" DROP CONSTRAINT "UsersReservations_userId_fkey";

-- DropTable
DROP TABLE "ClientsReservations";

-- DropTable
DROP TABLE "UsersReservations";

-- CreateTable
CREATE TABLE "_ReservationsUsers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ReservationssClients" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationsUsers_AB_unique" ON "_ReservationsUsers"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationsUsers_B_index" ON "_ReservationsUsers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReservationssClients_AB_unique" ON "_ReservationssClients"("A", "B");

-- CreateIndex
CREATE INDEX "_ReservationssClients_B_index" ON "_ReservationssClients"("B");

-- AddForeignKey
ALTER TABLE "_ReservationsUsers" ADD CONSTRAINT "_ReservationsUsers_A_fkey" FOREIGN KEY ("A") REFERENCES "Reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationsUsers" ADD CONSTRAINT "_ReservationsUsers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationssClients" ADD CONSTRAINT "_ReservationssClients_A_fkey" FOREIGN KEY ("A") REFERENCES "Clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReservationssClients" ADD CONSTRAINT "_ReservationssClients_B_fkey" FOREIGN KEY ("B") REFERENCES "Reservations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
