-- AlterTable
ALTER TABLE "nest"."tb_note" ALTER COLUMN "created_at" SET DEFAULT now();

-- AlterTable
ALTER TABLE "nest"."tb_user" ALTER COLUMN "created_at" SET DEFAULT now(),
ALTER COLUMN "updated_at" SET DEFAULT now();

-- CreateTable
CREATE TABLE "nest"."tb_post" (
    "cod_post" SERIAL NOT NULL,
    "cod_user" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tb_post_pkey" PRIMARY KEY ("cod_post")
);

-- AddForeignKey
ALTER TABLE "nest"."tb_post" ADD CONSTRAINT "tb_post_cod_user_fkey" FOREIGN KEY ("cod_user") REFERENCES "nest"."tb_user"("cod_user") ON DELETE RESTRICT ON UPDATE CASCADE;
