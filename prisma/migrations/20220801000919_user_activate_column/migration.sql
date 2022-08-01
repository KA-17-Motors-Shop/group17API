-- AlterTable
ALTER TABLE "user" ADD COLUMN     "access_token" VARCHAR NOT NULL DEFAULT '',
ADD COLUMN     "is_activate" BOOLEAN NOT NULL DEFAULT false;
