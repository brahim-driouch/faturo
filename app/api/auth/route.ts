import { getAuthCookie, verifyAuthToken } from "@/auth/auth";
import { NextRequest, NextResponse } from "next/server";




export async function GET(request: NextRequest) {

    try {

        const token= await getAuthCookie()
        if(!token) return NextResponse.json({message:"no token provided"},{status:404})
         const user = await verifyAuthToken<{ email: string; id: string; name: string }>(token);
        if(!user) return NextResponse.json({message:"Unauthorized"},{status:401})
        
        return NextResponse.json(user)
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Unauthorized"},{status:401})
    }
}