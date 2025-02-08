/*
  Warnings:

  - You are about to drop the column `experiencePoints` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `goldReward` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "experiencePoints",
DROP COLUMN "goldReward";
