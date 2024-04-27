import db from "@/lib/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const user = await db.user.findMany(
            {
                include:{
                    Business: true
                }
            }
        )
        if (!user) {
            return NextResponse.json({message: 'there are no user in the database'}, {status: 401});
        }
        return NextResponse.json({message: user},{status: 200})
    } catch (error) {
        return NextResponse.json({message: error},{status: 400})
    }
}