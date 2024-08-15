/*
  Warnings:

  - You are about to drop the column `sLastname` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `sName` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "sLastname",
DROP COLUMN "sName";
