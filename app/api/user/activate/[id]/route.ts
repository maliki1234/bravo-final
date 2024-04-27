import db from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {

    // console.log("activate")
    console.log(req.url)
    const data  = req.url
    const split = data.split('/activate/')[1]
    console.log(split)

const user = await db.user.findUnique({
    where: {
        id: parseInt(split)
    }
})


if (user) {
    const upate = await db.user.update({
        where: {
            id: parseInt(split)
        },data:{
            active: !user.active
        }
    })

    if (upate) {
        return NextResponse.json({message: `now ${user.firstName} is ${user.active? 'active' : 'not active'}`})
    }
}



   


    try {
        return NextResponse.json({messege:"ljfsdlkfjlsdk",status: 200})
    } catch (error) {
        
    }
}