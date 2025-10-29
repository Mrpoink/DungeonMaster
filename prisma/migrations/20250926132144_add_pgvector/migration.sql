-- CreateExtension
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "public"."MONSTERVECTOR" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(384),

    CONSTRAINT "MONSTERVECTOR_pkey" PRIMARY KEY ("id")
);
