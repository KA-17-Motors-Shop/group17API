-- CreateTable
CREATE TABLE "comments" (
    "id" UUID NOT NULL,
    "comment" VARCHAR NOT NULL,
    "published_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "announcement_id" UUID NOT NULL,
    "user_id" UUID,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "announcement"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
