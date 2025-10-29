-- CreateTable
CREATE TABLE "public"."SESSION" (
    "id" SERIAL NOT NULL,
    "sessionID" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "embedding" vector(384),

    CONSTRAINT "SESSION_pkey" PRIMARY KEY ("id")
);
