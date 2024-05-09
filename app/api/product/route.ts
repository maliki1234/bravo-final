import  db  from "@/lib/db"
import { hash } from "bcrypt";

import { NextResponse } from "next/server";
import * as z from "zod";
export const dynamic = "force-dynamic"


const formSchema = z.object({
    name: z.string().min(2, {message: 'please enter name'}),
    description: z.string().optional(),
    price: z.coerce.number().min(2, {message: 'please enter price'}),
    category:z.string().min(2, {message: 'this should be more than a 2 text'}),
    barcode: z.string().optional()
})

export async function POST(req: Request) {
    try {

        const body = await req.json();
        console.log(body)
        const {name ,description , price , category, barcode} =  formSchema.parse(body);
        
        const existingByPhoneNumber = await db.product.findUnique({
            where: {name}
        })
        if (existingByPhoneNumber) {
            return NextResponse.json({user: null , message: 'User with this phone number  already exist'} , {status: 509})
        }

        const categor = await db.category.findUnique({
            where :{
                name: category
            }
        })

        if(!categor){
            return NextResponse.json({user: null , message: 'User with this phone number  already exist'} , {status: 509})

        }

        const newProduct = await db.product.create({
            data:{
                name,
                description,
                price,
                barcode: barcode,
                categoryId: categor?.id,
                
            }
        })



        return NextResponse.json({
            product: newProduct,
            message:"product created",
        },{status:200} )

    } catch (error) {
        return NextResponse.json({ message: error},{status:500})
    }
} 

export async function GET(req:Request) {
    try {
        const product = await db.product.findMany({
            include: {
                category: true
            }
        })
        if (!product) {
            return NextResponse.json({success: false} ,{status: 500})
        }
        return NextResponse.json({success: true , message: product}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: error})
    }
}