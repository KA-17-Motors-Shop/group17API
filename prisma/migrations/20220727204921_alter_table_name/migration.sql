/*
  Warnings:

  - You are about to drop the `adress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "adress" DROP CONSTRAINT "adress_user_id_fkey";

-- DropTable
DROP TABLE "adress";

-- CreateTable
CREATE TABLE "address" (
    "id" UUID NOT NULL,
    "zipCode" VARCHAR NOT NULL,
    "state" VARCHAR NOT NULL,
    "city" VARCHAR NOT NULL,
    "street" VARCHAR NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" VARCHAR,
    "user_id" UUID,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
