import db from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req:Request) {

    const body = await req.json()
    const {name , amountPaid , phoneNumber} = body
    
    const checkExistence = await db.customer.findFirst({
        where: {
            name
        }
    })
     
    if (!checkExistence) {
        const createCustomer = await db.customer.create({
            data:{
                name,
                balance: amountPaid,
                phoneNumber
            }
        })
        if (!createCustomer) {
            return NextResponse.json({
                success: true,
                message: "failed to create new customer"
            },
        
        {
            status: 400
        })
        }
        return NextResponse.json({success: true , message: createCustomer}, {status: 200})
    }

    const updatecustomer = await db.customer.update({
        where:{
            id: checkExistence.id
        },
        data:{
            balance: amountPaid
        }
    })

    if (!updatecustomer) {
        return NextResponse.json({success: false , message: 'fail to update customer'}, {status: 400})
    }


    return NextResponse.json({success: true , message: updatecustomer }, {status: 200})
}

export async function GET(Req:Request) {
    
const customer = await db.customer.findMany()

if (!customer) {
    return NextResponse.json({success: false , message: 'no customer found'}, {status: 400})
}

    return NextResponse.json({success: true , message: customer}, {status: 200})
}