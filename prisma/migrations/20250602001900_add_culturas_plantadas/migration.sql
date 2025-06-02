/*
  Warnings:

  - You are about to drop the column `culturas` on the `Fazenda` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fazenda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "totalHectares" INTEGER NOT NULL,
    "areaAgricultavel" INTEGER NOT NULL,
    "areaVegetacao" INTEGER NOT NULL,
    "culturasPlantadas" TEXT,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "produtorId" INTEGER NOT NULL,
    CONSTRAINT "Fazenda_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "Produtor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fazenda" ("areaAgricultavel", "areaVegetacao", "cidade", "estado", "id", "nome", "produtorId", "totalHectares") SELECT "areaAgricultavel", "areaVegetacao", "cidade", "estado", "id", "nome", "produtorId", "totalHectares" FROM "Fazenda";
DROP TABLE "Fazenda";
ALTER TABLE "new_Fazenda" RENAME TO "Fazenda";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
