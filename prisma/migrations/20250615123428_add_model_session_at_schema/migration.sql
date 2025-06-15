-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "activeMessageId" INTEGER NOT NULL,
    "minValue" INTEGER NOT NULL,
    "maxValue" INTEGER NOT NULL,
    "isBounties" BOOLEAN NOT NULL DEFAULT true,
    "isProjects" BOOLEAN NOT NULL DEFAULT true,
    "skills" TEXT[],
    "location" TEXT NOT NULL,
    "hasSet" BOOLEAN NOT NULL DEFAULT false,
    "isEnableNoti" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);
