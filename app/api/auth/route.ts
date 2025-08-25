import { getAuthCookie, verifyAuthToken } from "@/auth/auth";
import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest) {

    try {

        const token= await getAuthCookie()
        if(!token) return NextResponse.json({message:"no token provided"},{status:404})
         const user = await verifyAuthToken<{ email: string; id: string; name: string }>(token);
        if(!user) return NextResponse.json({message:"Unauthorized"},{status:401})

        const dbUser = await prisma.user.findUnique({where:{id:user.id}})

        if(!dbUser) return NextResponse.json({message:"Unauthorized"},{status:401})
        
        return NextResponse.json({
            id:dbUser.id,
            name:dbUser.name,
            email:dbUser.email,
            businessId:dbUser.businessId,
            isActive:dbUser.isActive
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
}