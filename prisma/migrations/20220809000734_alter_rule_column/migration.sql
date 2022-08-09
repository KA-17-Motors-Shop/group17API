/*
  Warnings:

  - You are about to drop the `Bids` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bids" DROP CONSTRAINT "Bids_announcement_id_fkey";

-- DropForeignKey
ALTER TABLE "Bids" DROP CONSTRAINT "Bids_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_announcement_id_fkey";

-- AlterTable
ALTER TABLE "announcement" ALTER COLUMN "year" SET DATA TYPE VARCHAR,
ALTER COLUMN "km" SET DATA TYPE VARCHAR;

-- DropTable
DROP TABLE "Bids";

-- DropTable
DROP TABLE "Images";

-- CreateTable
CREATE TABLE "images" (
    "id" UUID NOT NULL,
    "file_name" VARCHAR NOT NULL,
    "announcement_id" UUID NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bids" (
    "id" UUID NOT NULL,
    "value" DECIMAL(20,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "announcement_id" UUID NOT NULL,
    "user_id" UUID,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcement"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcement"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
