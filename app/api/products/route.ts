import { prisma } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";






export async function GET(request: NextRequest) {
    try {
        const businessId = request.nextUrl.searchParams.get("businessId");
        if (!businessId) {
            return NextResponse.json({ message: "Aucun produit trouvé", status: "error",data:[] }, {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const products = await prisma.product.findMany({
            where: {
                businessId: Number(businessId), // Replace with the actual business ID or session-based ID
            },
            orderBy: { name: "asc" },
            include: {
                category: true, // Include category details
            },
        });

        return NextResponse.json({ data: products, status: "success" }, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log("Erreur lors de la récupération des produits", error);
        return NextResponse.json({
            status: "error",
            message: "Une erreur s'est produite lors de la récupération des produits",
        }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}