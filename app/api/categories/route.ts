import { prisma } from "@/config/db";
import { productcategorySchema } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { ca } from "zod/locales";





export async function GET(request:NextRequest){


    try {
    const businessId =  request.nextUrl.searchParams.get("businessId");
    if (!businessId) {
      return NextResponse.json(({ message: "Aucune catégorie trouvée",status:"error" }), {   
        status: 400,
      });
    }
         const categories = await prisma.category.findMany({
    where: {
      businessId:Number(businessId), // Replace with the actual business ID or session-based ID
    },
  orderBy: { name: "asc" },
 
 });
 console.log(categories);
 return NextResponse.json({data:categories,status:"success"}, {
    status: 200,
  });
    } catch (error) {
        console.log("Erreur lors de la récupération des categories",error);
        return {
            status:"error",
            message:"Une erreur s'est produite lors de la récupération des categories",
        }
    }
}