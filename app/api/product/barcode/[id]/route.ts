import db from "@/lib/db"
import { NextResponse } from "next/server"
export const dynamic = "force-dynamic";

export async function GET(req:Request) {
    // console.log(req.url)
    const url = req.url.split('barcode/')[1]

    try {
        const product = await db.product.findFirst({
            where: {
                barcode: url
            }
        })
        if (!product) {
        return NextResponse.json({success: false },{status: 500})
            
        }
        // console.log(product)
    return NextResponse.json({success: true, message: product },{status: 200})

    } catch (error) {
    return NextResponse.json({success: false },{status: 200})
        
    }
}