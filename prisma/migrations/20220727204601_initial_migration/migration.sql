-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "cpf" VARCHAR NOT NULL,
    "phone" VARCHAR NOT NULL,
    "birht_date" TIMESTAMPTZ(6) NOT NULL,
    "description" VARCHAR,
    "password" VARCHAR NOT NULL,
    "is_seller" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adress" (
    "id" UUID NOT NULL,
    "zipCode" VARCHAR NOT NULL,
    "state" VARCHAR NOT NULL,
    "city" VARCHAR NOT NULL,
    "street" VARCHAR NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" VARCHAR,
    "user_id" UUID,

    CONSTRAINT "adress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- AddForeignKey
ALTER TABLE "adress" ADD CONSTRAINT "adress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
