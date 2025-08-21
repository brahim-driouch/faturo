"use server"

import { BUSINESS_DOMAINS_ISIC } from "@/assets/business-domains"
import { prisma } from "@/config/db"




export const addBulkDomains = async () => {

  await prisma.businessDomain.createMany({data:BUSINESS_DOMAINS_ISIC})
  console.log("done") 
}