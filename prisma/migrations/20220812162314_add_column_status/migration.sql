-- CreateEnum
CREATE TYPE "status" AS ENUM ('in_progress', 'completed', 'stopped');

-- AlterTable
ALTER TABLE "announcement" ADD COLUMN     "status" "status" NOT NULL DEFAULT 'in_progress';
