/*
  Warnings:

  - You are about to drop the `visitHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "visitHistory" DROP CONSTRAINT "visitHistory_urlId_fkey";

-- DropTable
DROP TABLE "visitHistory";
