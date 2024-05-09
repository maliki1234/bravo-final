import db from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"
export async function POST(req:Request) {
    try {
        const body = await req.json();
        const {name  , description} = body

        const checkExistencce = await db.businness.findFirst()

        if (checkExistencce) {
            return NextResponse.json({success: true, message: "you should clear all business info before creating another "}, {status: 400});

        }


        const company = await db.businness.create({
            data:{
                name,
                description
            }
        })
        if (!company) {
            return NextResponse.json({success: false , message: "failed to register"}, {status:400})
        }
        return NextResponse.json({success: true, message: "successfull create business name"}, {status: 200});
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false , message: error}, {status:400})
        
    }
}


export async function GET(req:Request) {
    // console.log('mh')
    try {
        const businness = await db.businness.findFirst()
        if (!businness) {
            return NextResponse.json({success: false , message: "failed to register"}, {status:400})
            
        }
        // console.log(businness)
        return NextResponse.json({success: true, message: businness}, {status: 200});


    } catch (error) {
        return NextResponse.json({success: false , message: error}, {status:400})
        
    }
}
export async function DELETE(req:Request) {
try {
    const businness = await db.businness.deleteMany()
    if (!businness) {
        return NextResponse.json({success: false , message: "failed to register"}, {status:400})
        
    }
    return NextResponse.json({success: true, message: "success remove all company onfo"}, {status: 200});

} catch (error) {
    return NextResponse.json({success: false , message: error}, {status:400})
    
}    
}


export async function PUT(req:Request) {
    // console.log('put')
    const body = await req.json();
        const {name  , description, expDateInfo, productRemain } = body

    try {
        const businnesss = await db.businness.findFirst()
        if (!businnesss) {
            return NextResponse.json({success: false , message: "failed to register"}, {status:400})
            
        }

        const businessUpdate = await db.businness.update({
            where: {
                id: businnesss.id
            },data:{
                name,
                description,
                expDateInfo,
                productRemain,
            }

        })

        if (!businessUpdate) {
            return NextResponse.json({success: false , message: "failed to update"}, {status:400})
            
        }
        // console.log(businness)
        return NextResponse.json({success: true, message: businessUpdate}, {status: 200});


    } catch (error) {
        return NextResponse.json({success: false , message: error}, {status:400})
        
    }
}