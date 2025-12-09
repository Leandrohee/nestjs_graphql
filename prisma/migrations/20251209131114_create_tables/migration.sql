-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "nest";

-- CreateTable
CREATE TABLE "nest"."tb_user" (
    "cod_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "hash" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("cod_user")
);

-- CreateTable
CREATE TABLE "nest"."tb_note" (
    "cod_note" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),
    "cod_user" INTEGER NOT NULL,

    CONSTRAINT "tb_note_pkey" PRIMARY KEY ("cod_note")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "nest"."tb_user"("email");

-- AddForeignKey
ALTER TABLE "nest"."tb_note" ADD CONSTRAINT "tb_note_cod_user_fkey" FOREIGN KEY ("cod_user") REFERENCES "nest"."tb_user"("cod_user") ON DELETE RESTRICT ON UPDATE CASCADE;
