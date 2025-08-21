/*
  Warnings:

  - Added the required column `businessDomainId` to the `Business` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Business" ADD COLUMN     "businessDomainId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."BusinessDomain" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "BusinessDomain_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Business" ADD CONSTRAINT "Business_businessDomainId_fkey" FOREIGN KEY ("businessDomainId") REFERENCES "public"."BusinessDomain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
