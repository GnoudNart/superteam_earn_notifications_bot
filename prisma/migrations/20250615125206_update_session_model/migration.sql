/*
  Warnings:

  - You are about to drop the column `activeMessageId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `hasSet` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `isBounties` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `isEnableNoti` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `isProjects` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `maxValue` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `minValue` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[key]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "activeMessageId",
DROP COLUMN "createdAt",
DROP COLUMN "hasSet",
DROP COLUMN "isBounties",
DROP COLUMN "isEnableNoti",
DROP COLUMN "isProjects",
DROP COLUMN "location",
DROP COLUMN "maxValue",
DROP COLUMN "minValue",
DROP COLUMN "skills",
DROP COLUMN "updatedAt",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_key_key" ON "Session"("key");
