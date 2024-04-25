// import MainPage from '@/components/chart/MainPage'
import Header from '@/components/header/Header'
import Info from '@/components/info/Info'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

import React from 'react'
import PageMain from '../components/chart/PageMain'

import InfoCard from '@/components/information/InfoCard'
import {homePage} from '@/lib/link'


async function productQantityInfo() {
  try {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/product/alert",
      { cache: "no-store", method: "GET" }
    );

    if (!respond.ok) {
      throw new Error("failed to fetch error");
    }

    const data =  await respond.json();
    return data.message
    
  
  } catch (error) {
    return error
  }

}



async function productExpireInfo() {
  try {
    const respond = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/expire",
      { cache: "no-store", method: "GET" }
    );

    if (!respond.ok) {
      throw new Error("failed to fetch error");
    }

    const data =  await respond.json();
    return data.message
    
  
  } catch (error) {
    return error
  }

}



 const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bravo-eta-coral.vercel.app/"
    : "http://localhost:3000";

export default async function page() {
  const session: any = await getServerSession(authOptions)
  // console.log(session)

// console.log(link)
 if (session === null) {

redirect("/auth/login")
 }






 const productQuantityAlert = await productQantityInfo()
 const productExpireInfomation = await productExpireInfo() 


if (session?.role === "EMPLOYEE" ) {

redirect("/sales")


}

const expire  = ()=>{

}
  return (
  <div >
     <Header links={homePage}/>
   <Info/>
   <div className="grid grid-cols-1 md:grid-cols-6 px-4">
    <div className="col-span-4 h-auto md:h-96 ">
     <PageMain/>
     
    </div>
    <div className=" flex flex-col gap-4 col-span-2">
    
    <InfoCard heading={`product under ${session.BusinessInfo.productRemain} items`} content={productQuantityAlert.length} link={'product/alert/quantity'} />
    <InfoCard heading={`product expire alert before ${session.BusinessInfo.expDateInfo}`} content={productExpireInfomation.length} link={'product/alert/expire'}/>

    </div>
   </div>
  </div>
   
  )
}

export { baseUrl}