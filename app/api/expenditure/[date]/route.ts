import db from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req:Request){

const url = req.url.split('/expenditure/')[1]



const report = await db.expenditure.findMany({
    where:{
        date: url
    }
})



if (!report) {
return NextResponse.json({success: false, message: "cant find the report please "
 }, {status: 300})
    
}
return NextResponse.json({succcess: true, message: report}, {status: 200})
}