/*
  Warnings:

  - Made the column `user_id` on table `address` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "typeAnnouncement" AS ENUM ('auction', 'sale');

-- CreateEnum
CREATE TYPE "typeVehicle" AS ENUM ('car', 'motocycle');

-- AlterTable
ALTER TABLE "address" ALTER COLUMN "user_id" SET NOT NULL;

-- CreateTable
CREATE TABLE "Announcement" (
    "id" UUID NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "year" INTEGER NOT NULL,
    "Km" INTEGER NOT NULL,
    "price" DECIMAL(20,2) NOT NULL,
    "isActivate" BOOLEAN NOT NULL,
    "type" "typeAnnouncement" NOT NULL,
    "typeVehicle" "typeVehicle" NOT NULL,
    "limitDate" TIMESTAMPTZ(6) NOT NULL,
    "publishedData" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "winner_id" UUID,
    "seller_id" UUID NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
