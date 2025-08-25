"use server";

import { getCurrentSession } from "@/auth/auth";
import { prisma } from "@/config/db";
import { businessSchema } from "@/types";
import { CircleGauge } from "lucide-react";





export async function createBusiness(formdata:FormData){
          const businessPhoneNums:string[]  = []
          const businessEmails: string[] = []
    try {
        const businessName = formdata.get("businessName") as string;
         businessPhoneNums.push(formdata.get("businessPhoneNums") as string);
        const businessAddress = formdata.get("businessAddress") as string;
         businessEmails.push(formdata.get("businessEmails") as string);
        const businessLegalId = formdata.get("businessLegalId") as string;
        const businessDomainId   = formdata.get("businessDomainId") as string

        


        const validationResult = await businessSchema.safeParseAsync(
            {
                 businessName, 
                 businessPhoneNums,
                 businessAddress, businessEmails, 
                 businessLegalId, 
                businessDomainId:parseInt(businessDomainId)})
   
        if(!validationResult.success){
            return {
                message: validationResult.error.issues[0].message,
                status:"error",
                data: null
            }
        }

        const user = await getCurrentSession()

        if(!user) return {
            message:"Unauthorized",
            status:"error",
            data: null
        }


        await prisma.$transaction(async (tx) => {
           const newBusiness = await tx.business.create({
                data: {
                    businessName,
                    businessPhoneNums,
                    businessAddress,
                    businessEmails,
                    businessLegalId,
                    businessDomainId:Number(businessDomainId),
                }
            });
            await tx.user.update({
                where: {
                    id: user.id
                },
                data: {
                    businessId: newBusiness.id
                }
            });
        });
 
        return {
            message:"Ajouté avec success",
            status:"success",
            data: null
        }


    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
        return {
            message:"Une erreur s'est produite",
            status:"error",
            data: null
        }
    }
}