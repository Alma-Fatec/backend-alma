/*
  Warnings:

  - You are about to drop the `Classes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassesBlock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Classes" DROP CONSTRAINT "Classes_classesBlockId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_classesBlockId_fkey";

-- DropTable
DROP TABLE "Classes";

-- DropTable
DROP TABLE "ClassesBlock";

-- CreateTable
CREATE TABLE "classesBlock" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "classesBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "orderAtBlock" INTEGER NOT NULL,
    "classesBlockId" INTEGER,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_classesBlockId_fkey" FOREIGN KEY ("classesBlockId") REFERENCES "classesBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_classesBlockId_fkey" FOREIGN KEY ("classesBlockId") REFERENCES "classesBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
