-- CreateTable
CREATE TABLE "Bids" (
    "id" UUID NOT NULL,
    "value" DECIMAL(20,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "announcement_id" UUID NOT NULL,
    "user_id" UUID,

    CONSTRAINT "Bids_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bids" ADD CONSTRAINT "Bids_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcement"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Bids" ADD CONSTRAINT "Bids_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
