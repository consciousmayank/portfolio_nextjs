-- CreateTable
CREATE TABLE "ProjectInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologiesUsed" JSONB NOT NULL,
    "role" TEXT NOT NULL,
    "links" JSONB NOT NULL
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "phno" TEXT NOT NULL,
    "requirement" TEXT NOT NULL
);
