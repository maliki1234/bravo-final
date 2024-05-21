import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    
    try {
        const b =  await req.json();
        let {id   , price , quantity , user , customerId } = b

        // console.log(amountPaid)




        // console.log(b)
       let dat = new Date().toLocaleTimeString('en-US', { hour12: false, 
            hour: "numeric", 
            minute: "numeric"});


            const customer = await db.customer.findUnique({
                where:{
                    id: customerId
                }
            })

            if (!customer) {
                return NextResponse.json({success: false , message: "cant update"}, {status: 400})
            }



            // console.log(customer)
        const product = await db.product.findUnique({
            where:{
                id
            }

        })
        // console.log(product)

        if(!product){
            return NextResponse.json({ message: " product could not be found"}, {status: 303})
        }


        // LOOCKING FOR THE STOCK

        const stocks = await db.stock.findMany({
            where: {
                ProductId: id
            },
            orderBy: {
                createdAt: 'asc',
              },
        })
        // console.log(stocks)

        if (!stocks) {
            return NextResponse.json({ message: " stock could not be founded"}, {status: 303})
            
        }

        // THIS IS WHERE WE SHOULD FOCUS ON MORE

        const z = async(currentStock: any , quantity: number )=>{


             const b = {...currentStock}
            //  console.log(quantity)
               const c = currentStock.pPrice / product.quantity

            const updateStock = await db.stock.update({
                where: {
                    id: currentStock.id
                },
                data: {
                    remain: currentStock.remain - quantity
                }
            })

            if (!updateStock) {
                return  NextResponse.json({message: 'failed to update stock'} , {status: 303})

            }
            const createReport = await db.deni.create({
                data: {
                    ProductId: b.ProductId,
                    UserId: b.UserId,
                    quantity :  quantity,
                    price: product.price,
                    totalPrice: product.price * quantity,
                    date: `${new Date().toJSON().slice(0, 10)}`,
                    time: `${dat}`,
                    month: `${new Date().getMonth() + 1}`,
                    year: `${new Date().getFullYear()}`,
                    ppi: c,
                    profit: (product.price -  b.ppi) * quantity,
                    CustomerId: customerId
        
                }
               })
         
        
        }
        

        for(let i = 0; i < stocks.length; i++) {
            let currentStock = stocks[i];
            // console.log(quantity)
            if(quantity >= currentStock.remain ) // if quantity of the currentstock
            {
                quantity -= currentStock.remain;
                z(currentStock , quantity )
                currentStock.quantity = 0
                // console.log(currentStock)
            }else{
                currentStock.remain -= quantity
               z(currentStock ,quantity, )
                break;
            }

        }

       stocks.forEach(async element =>{
        console.log( element)

        const updateStock = await db.stock.update({
            where: {
                id: element.id,
            },
            data:{
                remain: element.remain
            }
        })

        if (!updateStock) {
          return  NextResponse.json({message: "Error updating stock"},{status: 303})
        }
        // console.log(element)


        const updateProduct  = await db.product.update({
            where: {
                id: element.ProductId,
            },
            data:{
                quantity: product.quantity - quantity
            }
           })

           if (!updateProduct) {
            return NextResponse.json({message: "Error updating product"},{status:300})
           }

           console.log(updateProduct)
       }
       
       )
    return  NextResponse.json({message: "thank you for buying from us"}, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: error},{status:500})
    }
} 

export async function GET(req:Request) {


    const deni = await db.deni.findMany({
        include: {
            Customer: true,
            Saler: true,
            Product: true
        }
    })
    if (!deni) {
        return NextResponse.json({success: false , message: "faied to fetch customer"}, {status: 400})
    }

   const b = deni.map(e =>{
    return {
        ...e,
        Saler: {
            name: e.Saler.firstName +" "+ e.Saler.lastName,
        }
    }
   })
//    console.log(b)

    return NextResponse.json({success: true , message: b}, {status: 200})
}