import db from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";
export const dynamic = "force-dynamic"

const formSchema = z.object({
    price: z.coerce.number().min(2, { message: 'Please enter the product name' }),
    quantity: z.coerce.number().min(2, { message: 'Please enter' }),
    // pricePerItem: z.coerce.number().min(2, { message: 'Please enter the price per item' }),
    expire: z.date({
      required_error: "A date of birth is required.",
    }),

    ProductId: z.number(),
    UserId: z.number(),
  })
  


export async function POST(req: Request) {
    try {

        const body = await req.json();
        // console.log(body)
        body.expire = new Date(body.expire)
        const {price , expire , quantity , ProductId , UserId} =  formSchema.parse(body);
        const newProduct = await db.stock.create({
            data:{
                pPrice: price,
                expire,
                ProductId,
                UserId,
                quantity,
                remain: quantity,
                ppi: price / quantity
            }
        })

        if (!newProduct) {
            return NextResponse.json({success: false , message: "can't add stock "} , {status:303})
        }

        // console.log(newProduct)

        const product  = await db.product.findUnique({
            where: {
                id: ProductId,
            }
        })
        // console.log(product)

        
        if (!product) { 
            return NextResponse.json({
                // product: newProduct,
                message:"product not found",
            },{status:300} )
    
        }
            
        const updateProduct = await db.product.update({
            where: {
                id: ProductId,
            
            },
            data: {
                quantity: product.quantity + quantity
            }
        })

        if (!updateProduct) {
            return NextResponse.json({
               
                message:"stock not added successfully",
            },{status:305} )
    
            
        }

    if(!updateProduct){
        return NextResponse.json({
            message:"ERROR: Product CANNOT be updated"},
            {status: 300}
        )
    }


       

        return NextResponse.json({
            product: newProduct,
            message:"stock added successfully",
        },{status:200} )

    } catch (error) {
        return NextResponse.json({ message: error?.message},{status:500})
    }
} 

export async function GET(req:Request) {
    try {
        const product = await db.product.findMany({
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                Stock: {
                    select: {
                        pPrice: true,
                        expire: true,
                        quantity: true,
                        ppi: true,
                        remain: true,
                    }
                },
            },
           
        })
        if (!product) {
            return NextResponse.json({success: false} ,{status: 500})
        }
        let b = []
        let c  = {}

       const newProduc =  product.map(element =>{
            const { category , Stock , ...rest} = element
            // console.log( Stock)

           const b = {
            ...rest ,
            category: category.name,
            purchasePrice: Stock.reduce((sum , el)=> sum + el.ppi * el.remain, 0),
            expireDate: Stock[0]?.expire || null,
            StockQuanity: Stock.length,
            Stock: Stock[0]


           }

        //    console.log(b)
           return b

        })

     
        return NextResponse.json({success: true , message: newProduc}, {status: 200})
    } catch (error) {
        return NextResponse.json({success: false, message: error})
    }
}