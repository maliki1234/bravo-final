
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Payment, columns , Product} from './columns'
import { DataTable } from './data-table'
import Link from 'next/link'
import ReportFooter from '@/components/report/ReportFooter'
// import { redirect } from 'next/navigation'

type product = {
  id: number,
  ProductId: number,
  UserId: number,
  createdAt: Date,
  updatedAt: Date,
  quantity: string,
  price: string,
  totalPrice: number,
  date: string,
  time: string,
  month: string,
  year: string,
  Product: {
    name: string,  
  },
  Saler: {
    firstName: string,
    lastName: string,
    
  }


}


async function getUsers(date:string) {
  // console.log(props)
  try {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL +  `api/report/byDate/${date}`,
      { cache: "no-store", method: "GET" }
    );

    if (!respond.ok) {
      throw new Error("failed to fetch error");
    }

    const data = await respond.json();
    return data.message
    
  
  } catch (error) {
    return error
  }

}


export default async function page(props) {
  const date = props.params.date
  const productData: product = await getUsers(date)
  // console.log(productData)
  return (
    <div className="">
      <div className="w-full py-2 px-6  flex justify-center">
      </div>
      <DataTable  columns={columns} data={productData} />

      <ReportFooter pro={productData} day={date} />

    </div>
  )
}


