
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Payment, columns , Product} from './columns'
import { DataTable } from './data-table'
import Link from 'next/link'
// import { redirect } from 'next/navigation'


async function getUsers() {
  try {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/customer/info",
      { cache: "no-store", method: "GET" }
    );

    if (!respond.ok) {
      throw new Error("failed to fetch error");
    }

    const data: Product = await respond.json();
    return data.message
    
  
  } catch (error) {
    return error
  }

}


export default async function page() {
  const productData = await getUsers()
  console.log(productData)

  
  
 
  return (
    <div className="">
      <div className="w-full py-2 px-6  flex justify-center">
      </div>
      <DataTable  columns={columns} data={productData} />

    </div>
  )
}


