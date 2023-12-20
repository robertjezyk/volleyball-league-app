-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "season" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leagueId" TEXT,
    "leagueType" TEXT,
    CONSTRAINT "Team_leagueId_leagueType_fkey" FOREIGN KEY ("leagueId", "leagueType") REFERENCES "League" ("id", "type") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TeamStanding" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "season" TEXT NOT NULL DEFAULT '2023/2024',
    "_teamStandingId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "played" INTEGER NOT NULL DEFAULT 0,
    "won" INTEGER NOT NULL DEFAULT 0,
    "lost" INTEGER NOT NULL DEFAULT 0,
    "setsFor" INTEGER NOT NULL DEFAULT 0,
    "setsAgainst" INTEGER NOT NULL DEFAULT 0,
    "pointsFor" INTEGER NOT NULL DEFAULT 0,
    "pointsAgainst" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TeamStanding__teamStandingId_fkey" FOREIGN KEY ("_teamStandingId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "League_type_key" ON "League"("type");

-- CreateIndex
CREATE UNIQUE INDEX "League_id_type_key" ON "League"("id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "TeamStanding__teamStandingId_key" ON "TeamStanding"("_teamStandingId");

-- CreateIndex
CREATE INDEX "teamStanding_teamStandingId_index" ON "TeamStanding"("_teamStandingId");
