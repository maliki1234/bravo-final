import db from "@/lib/db";
import moment from "moment";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(res: Response) {


    const company = await db.businness.findFirst()
    if(!company){
        return NextResponse.json({success: false , message: "Company not found"}, {status: 404})
    }

    // console.log(company)

    var date = moment()
            .add(company.expDateInfo,'d') //replace 2 with number of days you want to add
            .toDate(); //


            // console.log(date)

    var CurrentDate = moment().format();
   
    const getExpire = await db.stock.findMany({
       
            where: {
                quantity: {
                    gt: 0
                },
                expire:{
                    gte: CurrentDate,
                    lte: date
                }
            }
            ,include:{
                Product: {
                    select: {
                        name: true,price: true
                    }
                }
            }
         
        
    })

    // console.log(getExpire)

    if (!getExpire) {
        return NextResponse.json({success: false , message: "could not find the  expiration product"},{status: 300})
    }
   

    return NextResponse.json({success: true , message: getExpire},{status: 200})

}