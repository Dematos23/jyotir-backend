-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EXTERNO');

-- CreateEnum
CREATE TYPE "Canal" AS ENUM ('WHATSAPP', 'CORREO', 'TELEFONO');

-- CreateEnum
CREATE TYPE "Ambiente" AS ENUM ('SALON_PRINCIPAL', 'SALON_ESPEJO', 'SALA_1', 'CONSULTORIO_1', 'CONSULTORIO_2');

-- CreateEnum
CREATE TYPE "Implementos" AS ENUM ('HOJAS', 'LAPICEROS', 'COLORES', 'PAPEL_TOALLA', 'SILLAS_CIRCULO', 'SILLAS_FILA');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "name" TEXT NOT NULL,
    "sName" TEXT,
    "lastname" TEXT NOT NULL,
    "sLastname" TEXT,
    "spiritualName" TEXT NOT NULL,
    "dni" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "userMany" BOOLEAN NOT NULL,
    "clienteMany" BOOLEAN NOT NULL,
    "clientName" TEXT NOT NULL,
    "assistants" INTEGER NOT NULL,
    "listaCanal" "Canal" NOT NULL,
    "ambiente" "Ambiente" NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFin" TIMESTAMP(3) NOT NULL,
    "implementos" "Implementos"[],

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dni" (
    "id" SERIAL NOT NULL,
    "dni" INTEGER NOT NULL,
    "role" "Rol" NOT NULL,

    CONSTRAINT "Dni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserReserva" (
    "userId" INTEGER NOT NULL,
    "reservaId" INTEGER NOT NULL,

    CONSTRAINT "UserReserva_pkey" PRIMARY KEY ("userId","reservaId")
);

-- CreateTable
CREATE TABLE "_UserReserva" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "_UserReserva_AB_unique" ON "_UserReserva"("A", "B");

-- CreateIndex
CREATE INDEX "_UserReserva_B_index" ON "_UserReserva"("B");

-- AddForeignKey
ALTER TABLE "UserReserva" ADD CONSTRAINT "UserReserva_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReserva" ADD CONSTRAINT "UserReserva_reservaId_fkey" FOREIGN KEY ("reservaId") REFERENCES "Reserva"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserReserva" ADD CONSTRAINT "_UserReserva_A_fkey" FOREIGN KEY ("A") REFERENCES "Reserva"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserReserva" ADD CONSTRAINT "_UserReserva_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
