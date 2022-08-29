-- AlterTable
ALTER TABLE "users" ADD COLUMN     "classesBlockId" INTEGER;

-- CreateTable
CREATE TABLE "ClassesBlock" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "ClassesBlock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "orderAtBlock" INTEGER NOT NULL,
    "classesBlockId" INTEGER,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_classesBlockId_fkey" FOREIGN KEY ("classesBlockId") REFERENCES "ClassesBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_classesBlockId_fkey" FOREIGN KEY ("classesBlockId") REFERENCES "ClassesBlock"("id") ON DELETE SET NULL ON UPDATE CASCADE;
