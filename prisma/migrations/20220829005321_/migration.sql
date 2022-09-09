-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_classesBlockId_fkey" FOREIGN KEY ("classesBlockId") REFERENCES "classesBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_classesBlockId_fkey" FOREIGN KEY ("classesBlockId") REFERENCES "classesBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
