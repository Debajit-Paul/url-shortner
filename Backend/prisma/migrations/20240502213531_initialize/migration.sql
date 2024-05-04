-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "shortId" TEXT NOT NULL,
    "redirectURL" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitHistory" (
    "id" SERIAL NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "urlId" INTEGER NOT NULL,

    CONSTRAINT "visitHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortId_key" ON "Url"("shortId");

-- AddForeignKey
ALTER TABLE "visitHistory" ADD CONSTRAINT "visitHistory_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
