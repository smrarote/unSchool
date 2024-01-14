-- DropForeignKey
ALTER TABLE "attachments" DROP CONSTRAINT "attachments_coursesCourse_id_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_coursesCourse_id_fkey";

-- AlterTable
ALTER TABLE "chapters" ADD COLUMN     "parent_id" TEXT;

-- AlterTable
ALTER TABLE "content" ADD COLUMN     "parent_id" TEXT;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_coursesCourse_id_fkey" FOREIGN KEY ("coursesCourse_id") REFERENCES "courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_coursesCourse_id_fkey" FOREIGN KEY ("coursesCourse_id") REFERENCES "courses"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "content"("cont_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_chap_id_fkey" FOREIGN KEY ("chap_id") REFERENCES "chapters"("chap_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "chapters"("chap_id") ON DELETE RESTRICT ON UPDATE CASCADE;
