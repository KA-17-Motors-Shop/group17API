/*
  Warnings:

  - You are about to drop the column `Km` on the `announcement` table. All the data in the column will be lost.
  - Added the required column `km` to the `announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcement" DROP COLUMN "Km",
ADD COLUMN     "km" INTEGER NOT NULL;
