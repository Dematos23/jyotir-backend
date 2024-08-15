/*
  Warnings:

  - Added the required column `state` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserState" AS ENUM ('ACTIVO', 'INACTIVO');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "state" "UserState" NOT NULL;
