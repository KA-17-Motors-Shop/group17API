-- CreateTable
CREATE TABLE "Images" (
    "id" UUID NOT NULL,
    "file_name" VARCHAR NOT NULL,
    "announcement_id" UUID NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcement"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
