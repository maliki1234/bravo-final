import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  const url = req.url.split("/byDate/")[1]
  const report = await db.report.findMany({
    where: {
      date: url,
    },
    include: {
      Product: {
        select: {
          name: true,
        },
      },
      Saler: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  if (!report) {
    return NextResponse.json(
      {
        success: false,
        message: "cant find the report please ",
      },
      { status: 300 }
    );
  }

  return NextResponse.json(
    { succcess: true, message: report },
    { status: 200 }
  );
}
