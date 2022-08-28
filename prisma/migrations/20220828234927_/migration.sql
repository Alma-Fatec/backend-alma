/*
  Warnings:

  - You are about to alter the column `name` on the `classes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(240)`.
  - You are about to alter the column `description` on the `classes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(240)`.
  - You are about to alter the column `description` on the `classesBlock` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(240)`.

*/
-- AlterTable
ALTER TABLE "classes" ALTER COLUMN "name" SET DATA TYPE VARCHAR(240),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(240);

-- AlterTable
ALTER TABLE "classesBlock" ALTER COLUMN "description" SET DATA TYPE VARCHAR(240);
