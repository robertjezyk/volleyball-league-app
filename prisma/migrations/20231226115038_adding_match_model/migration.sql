-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "setsHome" INTEGER NOT NULL,
    "setsAway" INTEGER NOT NULL,
    "pointsHome" INTEGER NOT NULL,
    "pointsAway" INTEGER NOT NULL,
    "leaguePointsHome" INTEGER NOT NULL,
    "leaguePointsAway" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "match_homeTeamId_index" ON "Match"("homeTeamId");

-- CreateIndex
CREATE INDEX "match_awayTeamId_index" ON "Match"("awayTeamId");

-- CreateIndex
CREATE INDEX "team_league_index" ON "Team"("leagueId", "leagueType");
