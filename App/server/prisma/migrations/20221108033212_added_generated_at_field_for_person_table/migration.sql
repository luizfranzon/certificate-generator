-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "generatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "certificateCode" TEXT NOT NULL
);
INSERT INTO "new_Person" ("certificateCode", "id", "name") SELECT "certificateCode", "id", "name" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_certificateCode_key" ON "Person"("certificateCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
