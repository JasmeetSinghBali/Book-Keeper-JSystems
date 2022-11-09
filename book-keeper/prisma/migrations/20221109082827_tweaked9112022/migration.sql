/*
  Warnings:

  - You are about to drop the `Cards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('DEBIT', 'CREDIT');

-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_mappeduserId_fkey";

-- DropForeignKey
ALTER TABLE "Contacts" DROP CONSTRAINT "Contacts_mappeduserId_fkey";

-- DropTable
DROP TABLE "Cards";

-- DropTable
DROP TABLE "Contacts";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "plan" "Plan" NOT NULL DEFAULT 'COMMUNITY',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "cardtype" "CardType" NOT NULL,
    "cardno" TEXT NOT NULL,
    "mappeduserId" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "cardtype" "CardType" NOT NULL,
    "cardno" TEXT NOT NULL,
    "mappeduserId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_phone_key" ON "Contact"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_cardno_key" ON "Contact"("cardno");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_mappeduserId_key" ON "Contact"("mappeduserId");

-- CreateIndex
CREATE UNIQUE INDEX "Card_cardno_key" ON "Card"("cardno");

-- CreateIndex
CREATE UNIQUE INDEX "Card_mappeduserId_key" ON "Card"("mappeduserId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_mappeduserId_fkey" FOREIGN KEY ("mappeduserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_mappeduserId_fkey" FOREIGN KEY ("mappeduserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
