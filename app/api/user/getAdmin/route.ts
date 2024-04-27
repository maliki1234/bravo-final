import db from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(req:Request) {
    try {

        const user = await db.user.findFirst({
            where: {
                role: 'ADMIN'
            }
        })
        if (!user) {
        return NextResponse.json({success: false , message:"there is no admin account please register admin accout"}, {status: 400})
            
        }

        return NextResponse.json({success: true , message:"success"}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false , message:"something is wrong with this operating system please contact a technician"}, {status: 400})
        
    }
}