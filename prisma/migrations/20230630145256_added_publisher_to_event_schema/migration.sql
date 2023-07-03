/*
  Warnings:

  - Added the required column `publisher` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "publisher" TEXT NOT NULL;
