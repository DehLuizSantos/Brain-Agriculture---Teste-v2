-- CreateTable
CREATE TABLE "Produtor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeProdutor" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "nomeFazenda" TEXT NOT NULL,
    "totalHectares" INTEGER NOT NULL,
    "areaAgricultavel" INTEGER NOT NULL,
    "areaVegetacao" INTEGER NOT NULL,
    "culturasPlantadas" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL
);
