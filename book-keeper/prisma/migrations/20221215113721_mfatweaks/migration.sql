-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mfa_isEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "secret_mfa" JSONB;
