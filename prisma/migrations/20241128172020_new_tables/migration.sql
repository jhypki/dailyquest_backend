/*
  Warnings:

  - The values [pending,in_progress] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `difficulty` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `importance` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DateFormat" AS ENUM ('YYYY_MM_DD', 'DD_MM_YYYY', 'MM_DD_YYYY');

-- CreateEnum
CREATE TYPE "timeFormat" AS ENUM ('HH_mm', 'hh_mm_a', 'HH_mm_ss');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('light', 'dark');

-- CreateEnum
CREATE TYPE "Side" AS ENUM ('left', 'right');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Category" ADD VALUE 'work';
ALTER TYPE "Category" ADD VALUE 'school';

-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('incomplete', 'completed', 'failed', 'cancelled');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "customCategoryId" TEXT,
ADD COLUMN     "difficulty" INTEGER NOT NULL,
ADD COLUMN     "hoursBeforeDue" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "hoursBeforeWarning" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "importance" INTEGER NOT NULL,
ADD COLUMN     "repeatDays" INTEGER DEFAULT 0,
ADD COLUMN     "repeatMonths" INTEGER DEFAULT 0,
ADD COLUMN     "repeatUntil" TIMESTAMP(3),
ADD COLUMN     "repeatWeeks" INTEGER DEFAULT 0,
ADD COLUMN     "repeatYears" INTEGER DEFAULT 0,
ADD COLUMN     "repeatable" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "category" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CustomCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "strengthRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "intelligenceRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "charismaRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "dexterityRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "enduranceRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "color" TEXT NOT NULL,

    CONSTRAINT "CustomCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "actionButtonsSide" "Side" NOT NULL,
    "actionButtonsSize" DECIMAL(65,30) NOT NULL DEFAULT 0.5,
    "theme" "Theme" NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "dateFormat" "DateFormat" NOT NULL DEFAULT 'YYYY_MM_DD',
    "timeFormat" "timeFormat" NOT NULL DEFAULT 'HH_mm',
    "showNotifications" BOOLEAN NOT NULL DEFAULT true,
    "showAnimations" BOOLEAN NOT NULL DEFAULT true,
    "hoursBeforeWarning" INTEGER NOT NULL DEFAULT 3,
    "hoursBeforeDue" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreferences_userId_key" ON "UserPreferences"("userId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_customCategoryId_fkey" FOREIGN KEY ("customCategoryId") REFERENCES "CustomCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomCategory" ADD CONSTRAINT "CustomCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
