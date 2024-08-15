/*
  Warnings:

  - You are about to drop the column `rol` on the `Users` table. All the data in the column will be lost.
  - Added the required column `role` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DEV', 'SUPER_ADMIN', 'ADMIN', 'EXTERNO');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "rol",
ADD COLUMN     "role" "Role" NOT NULL;

-- DropEnum
DROP TYPE "Rol";
