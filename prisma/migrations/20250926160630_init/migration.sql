-- CreateTable
CREATE TABLE "public"."SPELLSVECTOR" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(384),

    CONSTRAINT "SPELLSVECTOR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ITEMSVECTOR" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(384),

    CONSTRAINT "ITEMSVECTOR_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CHARACTERVECTOR" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(384),

    CONSTRAINT "CHARACTERVECTOR_pkey" PRIMARY KEY ("id")
);
