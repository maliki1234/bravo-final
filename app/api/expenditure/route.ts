import db from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter a valid  name" }),
  price: z.coerce.number().min(2, { message: "Please enter a valid quantity" }),
  user: z.coerce.number(),
});



export async function POST(req: Request) {
  const body = await req.json();
  let dat = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });

  const { name, price, user } = formSchema.parse(body);

  const expenditure = await db.expenditure.create({
    data: {
      name,
      price,
      UserId: user,
      date: `${new Date().toJSON().slice(0, 10)}`,
      time: `${dat}`,
      month: `${new Date().getMonth() + 1}`,
      year: `${new Date().getFullYear()}`,
    },
  });
  if (!expenditure) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid   subscription" },
      { status: 300 }
    );
  }
  return NextResponse.json(
    { success: true, message: expenditure },
    { status: 200 }
  );
}

export async function GET(req: Request) {
  const expenditure = await db.expenditure.groupBy({
    by: ["date"],
    _sum: {
      price: true,
    },
  });

  if (!expenditure) {
    return NextResponse.json(
      { success: false, message: "couldnt find product" },
      { status: 300 }
    );
  }
  return NextResponse.json(
    { success: true, message: expenditure },
    { status: 200 }
  );
}
