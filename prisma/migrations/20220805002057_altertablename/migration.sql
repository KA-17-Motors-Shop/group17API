/*
  Warnings:

  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_winner_id_fkey";

-- DropTable
DROP TABLE "Announcement";

-- CreateTable
CREATE TABLE "announcement" (
    "id" UUID NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "year" INTEGER NOT NULL,
    "Km" INTEGER NOT NULL,
    "price" DECIMAL(20,2) NOT NULL,
    "is_activate" BOOLEAN NOT NULL,
    "type" "typeAnnouncement" NOT NULL,
    "type_vehicle" "typeVehicle" NOT NULL,
    "limit_date" TIMESTAMPTZ(6) NOT NULL,
    "published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "winner_id" UUID,
    "seller_id" UUID NOT NULL,

    CONSTRAINT "announcement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "announcement" ADD CONSTRAINT "announcement_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "announcement" ADD CONSTRAINT "announcement_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
