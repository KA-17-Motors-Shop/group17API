/*
  Warnings:

  - You are about to drop the column `isActivate` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `limitDate` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `publishedData` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `typeVehicle` on the `Announcement` table. All the data in the column will be lost.
  - Added the required column `is_activate` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limit_date` to the `Announcement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_vehicle` to the `Announcement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "isActivate",
DROP COLUMN "limitDate",
DROP COLUMN "publishedData",
DROP COLUMN "typeVehicle",
ADD COLUMN     "is_activate" BOOLEAN NOT NULL,
ADD COLUMN     "limit_date" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type_vehicle" "typeVehicle" NOT NULL;
