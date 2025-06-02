/*
  Warnings:

  - You are about to drop the column `areaAgricultavel` on the `Produtor` table. All the data in the column will be lost.
  - You are about to drop the column `areaVegetacao` on the `Produtor` table. All the data in the column will be lost.
  - You are about to drop the column `cidade` on the `Produtor` table. All the data in the column will be lost.
  - You are about to drop the column `culturasPlantadas` on the `Produtor` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `Produtor` table. All the data in the column will be lost.
  - You are about to drop the column `nomeFazenda` on the `Produtor` table. All the data in the column will be lost.
  - You are about to drop the column `nomeProdutor` on the `Produtor` table. All the data in the column will be lost.
  - You are about to drop the column `totalHectares` on the `Produtor` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Produtor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Fazenda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "totalHectares" INTEGER NOT NULL,
    "areaAgricultavel" INTEGER NOT NULL,
    "areaVegetacao" INTEGER NOT NULL,
    "culturas" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "produtorId" INTEGER NOT NULL,
    CONSTRAINT "Fazenda_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "Produtor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produtor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "documento" TEXT NOT NULL
);
INSERT INTO "new_Produtor" ("documento", "id") SELECT "documento", "id" FROM "Produtor";
DROP TABLE "Produtor";
ALTER TABLE "new_Produtor" RENAME TO "Produtor";
CREATE UNIQUE INDEX "Produtor_documento_key" ON "Produtor"("documento");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
