/*
  Warnings:

  - A unique constraint covering the columns `[homeTeamId,awayTeamId]` on the table `Match` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Match_homeTeamId_awayTeamId_key" ON "Match"("homeTeamId", "awayTeamId");
