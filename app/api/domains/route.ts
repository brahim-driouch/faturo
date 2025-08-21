import { prisma } from "@/config/db";
import { NextResponse } from "next/server";




export  async function GET(request: Request) {
        const domains = await prisma.businessDomain.findMany()
        return NextResponse.json(domains);
    }   