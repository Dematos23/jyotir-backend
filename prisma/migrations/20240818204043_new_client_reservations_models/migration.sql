-- CreateEnum
CREATE TYPE "ReservationState" AS ENUM ('EVALUACION', 'APROBADO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "Office" AS ENUM ('SALON_PRINCIPAL', 'SALON_ESPEJO', 'SALA_1', 'CONSULTORIO_1', 'CONSULTORIO_2');

-- CreateTable
CREATE TABLE "Reservations" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "implementos" TEXT,
    "office" "Office" NOT NULL,
    "state" "ReservationState" NOT NULL,

    CONSTRAINT "Reservations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "Dni" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "emergencyContact" TEXT,
    "district" TEXT,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersReservations" (
    "userId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "UsersReservations_pkey" PRIMARY KEY ("userId","reservationId")
);

-- CreateTable
CREATE TABLE "ClientsReservations" (
    "clientId" TEXT NOT NULL,
    "reservationId" TEXT NOT NULL,

    CONSTRAINT "ClientsReservations_pkey" PRIMARY KEY ("clientId","reservationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reservations_id_key" ON "Reservations"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_id_key" ON "Clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_Dni_key" ON "Clients"("Dni");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_phone_key" ON "Clients"("phone");

-- AddForeignKey
ALTER TABLE "UsersReservations" ADD CONSTRAINT "UsersReservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersReservations" ADD CONSTRAINT "UsersReservations_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsReservations" ADD CONSTRAINT "ClientsReservations_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsReservations" ADD CONSTRAINT "ClientsReservations_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
