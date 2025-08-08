-- AlterTable
ALTER TABLE "public"."task" ADD COLUMN     "dueAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "dueAt" TIMESTAMP(3);
