/*
  Warnings:

  - Added the required column `balance` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "balance" INTEGER NOT NULL;
