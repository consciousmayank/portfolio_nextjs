-- CreateTable
CREATE TABLE "ProjectInfo" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technologiesUsed" JSONB NOT NULL,
    "role" TEXT NOT NULL,
    "links" JSONB NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "ProjectInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "phno" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConnectWithMe" (
    "id" SERIAL NOT NULL,
    "connectHandles" JSONB NOT NULL,
    "emailId" TEXT NOT NULL,

    CONSTRAINT "ConnectWithMe_pkey" PRIMARY KEY ("id")
);
