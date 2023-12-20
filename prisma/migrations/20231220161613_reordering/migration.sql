/*
  Warnings:

  - You are about to drop the column `season` on the `TeamStanding` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TeamStanding" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "played" INTEGER NOT NULL DEFAULT 0,
    "won" INTEGER NOT NULL DEFAULT 0,
    "lost" INTEGER NOT NULL DEFAULT 0,
    "setsFor" INTEGER NOT NULL DEFAULT 0,
    "setsAgainst" INTEGER NOT NULL DEFAULT 0,
    "pointsFor" INTEGER NOT NULL DEFAULT 0,
    "pointsAgainst" INTEGER NOT NULL DEFAULT 0,
    "_teamStandingId" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TeamStanding__teamStandingId_fkey" FOREIGN KEY ("_teamStandingId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TeamStanding" ("_teamStandingId", "id", "lost", "played", "points", "pointsAgainst", "pointsFor", "setsAgainst", "setsFor", "updatedAt", "won") SELECT "_teamStandingId", "id", "lost", "played", "points", "pointsAgainst", "pointsFor", "setsAgainst", "setsFor", "updatedAt", "won" FROM "TeamStanding";
DROP TABLE "TeamStanding";
ALTER TABLE "new_TeamStanding" RENAME TO "TeamStanding";
CREATE UNIQUE INDEX "TeamStanding__teamStandingId_key" ON "TeamStanding"("_teamStandingId");
CREATE INDEX "teamStanding_teamStandingId_index" ON "TeamStanding"("_teamStandingId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
