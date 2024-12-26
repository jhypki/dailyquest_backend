/*
  Warnings:

  - You are about to drop the column `rewardExp` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `rewardGold` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `experiencePoints` on the `Stats` table. All the data in the column will be lost.
  - You are about to drop the column `gold` on the `Stats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "rewardExp",
DROP COLUMN "rewardGold";

-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "experiencePoints",
DROP COLUMN "gold";
