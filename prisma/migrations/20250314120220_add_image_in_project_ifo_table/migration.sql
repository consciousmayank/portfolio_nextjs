/*
  Warnings:

  - Added the required column `image` to the `ProjectInfo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologiesUsed" JSONB NOT NULL,
    "role" TEXT NOT NULL,
    "links" JSONB NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_ProjectInfo" ("description", "id", "links", "role", "technologiesUsed", "title") SELECT "description", "id", "links", "role", "technologiesUsed", "title" FROM "ProjectInfo";
DROP TABLE "ProjectInfo";
ALTER TABLE "new_ProjectInfo" RENAME TO "ProjectInfo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
