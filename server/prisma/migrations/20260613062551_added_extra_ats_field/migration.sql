-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "analyzed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "atsScore" INTEGER;
