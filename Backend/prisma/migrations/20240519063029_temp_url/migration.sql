-- CreateTable
CREATE TABLE "TempUrl" (
    "id" SERIAL NOT NULL,
    "shortId" TEXT NOT NULL,
    "redirectURL" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TempUrl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TempClickHistory" (
    "id" SERIAL NOT NULL,
    "clickTime" TIMESTAMP(3) NOT NULL,
    "urlId" INTEGER NOT NULL,

    CONSTRAINT "TempClickHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TempUrl_shortId_key" ON "TempUrl"("shortId");

-- AddForeignKey
ALTER TABLE "TempClickHistory" ADD CONSTRAINT "TempClickHistory_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "TempUrl"("id") ON DELETE CASCADE ON UPDATE CASCADE;
