-- CreateTable
CREATE TABLE "ConnectWithMe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "connectHandles" JSONB NOT NULL,
    "emailId" TEXT NOT NULL
);
