-- CreateTable
CREATE TABLE "Lotto" (
    "id" SERIAL NOT NULL,
    "drawDate" TIMESTAMP(3) NOT NULL,
    "typeDigit" TEXT NOT NULL,
    "DigitOn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lotto_pkey" PRIMARY KEY ("id")
);
