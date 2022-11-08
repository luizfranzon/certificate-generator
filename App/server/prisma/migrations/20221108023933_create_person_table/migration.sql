-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "certificateCode" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_certificateCode_key" ON "Person"("certificateCode");
