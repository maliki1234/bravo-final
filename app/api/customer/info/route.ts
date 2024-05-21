import db from "@/lib/db";
import { product } from "@/lib/link";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
    const customer = await db.customer.groupBy({
       by:['name'],
       
})

    if (!customer) {
        return NextResponse.json({success: false , message: "failed to fetch customer"}, {status: 400})
    }

    
    
    return NextResponse.json({success: true , message: ""}, {status: 200})
}