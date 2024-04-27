import db from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {

    const company = await db.businness.findFirst()

    if (!company) {
        return NextResponse.json({success: false, message: "connot find company"}, {status: 404,})
    }
    // console.log(company)
    
    try {
        const product  = await db.product.findMany({
            where: {
             quantity: {
                 lte: company.productRemain
             }
            }
             
         })
     
        //  console.log(product)
        return NextResponse.json({
            // product: product,
            message:product,
        },{status:200} )
    } catch (error) {
        
    } 
}