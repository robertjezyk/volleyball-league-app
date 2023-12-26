-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leagueType" TEXT,
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
    "leagueId" TEXT NOT NULL,
    CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_leagueId_leagueType_fkey" FOREIGN KEY ("leagueId", "leagueType") REFERENCES "League" ("id", "type") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("awayTeamId", "createdAt", "date", "homeTeamId", "id", "leagueId", "leaguePointsAway", "leaguePointsHome", "leagueType", "pointsAway", "pointsHome", "setsAway", "setsHome", "updatedAt") SELECT "awayTeamId", "createdAt", "date", "homeTeamId", "id", "leagueId", "leaguePointsAway", "leaguePointsHome", "leagueType", "pointsAway", "pointsHome", "setsAway", "setsHome", "updatedAt" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
CREATE INDEX "match_homeTeamId_index" ON "Match"("homeTeamId");
CREATE INDEX "match_awayTeamId_index" ON "Match"("awayTeamId");
CREATE INDEX "match_leagueId_index" ON "Match"("leagueId", "leagueType");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
