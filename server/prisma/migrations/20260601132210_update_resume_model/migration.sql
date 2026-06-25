/*
  Warnings:

  - You are about to drop the column `filepath` on the `Resume` table. All the data in the column will be lost.
  - Added the required column `fileUrl` to the `Resume` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Resume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "filepath",
ADD COLUMN     "fileUrl" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
