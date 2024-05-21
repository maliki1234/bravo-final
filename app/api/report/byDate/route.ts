import db from "@/lib/db"
import { NextResponse } from "next/server"
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(req:Request) {
    try {
        const report = await db.report.groupBy({
          by:  ['date'],
          _sum:{
            totalPrice: true
          }
          }
        )
        if (!report) {
            return NextResponse.json({success: false} ,{status: 500})
        }
        // console.log(report)


        
        return NextResponse.json({success: true , message: report}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: error})
    }
}