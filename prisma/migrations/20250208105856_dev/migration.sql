/*
  Warnings:

  - The values [work,school] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - The values [incomplete] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `charismaRate` on the `CustomCategory` table. All the data in the column will be lost.
  - You are about to drop the column `dexterityRate` on the `CustomCategory` table. All the data in the column will be lost.
  - You are about to drop the column `enduranceRate` on the `CustomCategory` table. All the data in the column will be lost.
  - You are about to drop the column `intelligenceRate` on the `CustomCategory` table. All the data in the column will be lost.
  - You are about to drop the column `strengthRate` on the `CustomCategory` table. All the data in the column will be lost.
  - You are about to drop the column `customCategoryId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `difficulty` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `hoursBeforeDue` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `hoursBeforeWarning` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `importance` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `repeatDays` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `repeatMonths` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `repeatUntil` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `repeatWeeks` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `repeatYears` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `repeatable` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `UserPreferences` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `charismaMultiplier` to the `CustomCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dexterityMultiplier` to the `CustomCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enduranceMultiplier` to the `CustomCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `CustomCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intelligenceMultiplier` to the `CustomCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strengthMultiplier` to the `CustomCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vitalityMultiplier` to the `CustomCategory` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `CustomCategory` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('physical', 'mental', 'social', 'household', 'personal_development');
ALTER TABLE "Task" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('pending', 'in_progress', 'completed', 'failed', 'cancelled');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING ("status"::text::"TaskStatus_new");
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "TaskStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_customCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_userId_fkey";

-- AlterTable
ALTER TABLE "CustomCategory" DROP COLUMN "charismaRate",
DROP COLUMN "dexterityRate",
DROP COLUMN "enduranceRate",
DROP COLUMN "intelligenceRate",
DROP COLUMN "strengthRate",
ADD COLUMN     "charismaMultiplier" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "dexterityMultiplier" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "enduranceMultiplier" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "intelligenceMultiplier" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "strengthMultiplier" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "vitalityMultiplier" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "customCategoryId",
DROP COLUMN "difficulty",
DROP COLUMN "hoursBeforeDue",
DROP COLUMN "hoursBeforeWarning",
DROP COLUMN "importance",
DROP COLUMN "repeatDays",
DROP COLUMN "repeatMonths",
DROP COLUMN "repeatUntil",
DROP COLUMN "repeatWeeks",
DROP COLUMN "repeatYears",
DROP COLUMN "repeatable",
ALTER COLUMN "category" SET NOT NULL;

-- DropTable
DROP TABLE "UserPreferences";

-- DropEnum
DROP TYPE "DateFormat";

-- DropEnum
DROP TYPE "Side";

-- DropEnum
DROP TYPE "Theme";

-- DropEnum
DROP TYPE "timeFormat";

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "notifications" BOOLEAN NOT NULL DEFAULT true,
    "primaryColor" TEXT NOT NULL DEFAULT '#000000',

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
