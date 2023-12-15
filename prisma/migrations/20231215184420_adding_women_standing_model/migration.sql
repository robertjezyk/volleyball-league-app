-- CreateTable
CREATE TABLE "TeamWomen" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TeamWomenStanding" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "_id" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "played" INTEGER NOT NULL DEFAULT 0,
    "won" INTEGER NOT NULL DEFAULT 0,
    "lost" INTEGER NOT NULL DEFAULT 0,
    "setsFor" INTEGER NOT NULL DEFAULT 0,
    "setsAgainst" INTEGER NOT NULL DEFAULT 0,
    "pointsFor" INTEGER NOT NULL DEFAULT 0,
    "pointsAgainst" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TeamWomenStanding__id_fkey" FOREIGN KEY ("_id") REFERENCES "TeamWomen" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamWomenStanding__id_key" ON "TeamWomenStanding"("_id");

-- CreateIndex
CREATE INDEX "teamWomenStanding_teamId_index" ON "TeamWomenStanding"("_id");
