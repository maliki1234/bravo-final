"use client"

import React, { useEffect, useState } from 'react'
import HomePageHeadCard from './HomePageHeadCard'
import { AiFillAccountBook, AiFillShop, AiOutlineDollar, AiOutlineImport, AiOutlineUser } from 'react-icons/ai'
import { redirect, useRouter } from 'next/navigation'
import Link from 'next/link'


export default function Info() {

  const [users, setusers] = useState(0)
  const [product, setproduct] = useState(0)
  // console.log(product)


  const getProduct =async () => {
    try {
      const respond = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/product",
        { cache: "no-store", method: "GET" }
      );
  
      if (!respond.ok) {
        throw new Error("failed to fetch error");
      }
      

     const user = await respond.json()
    //  console.log(user)
     setproduct(user.message.length)
    // console.log(user.message.length)
      
    
    } catch (error) {
      return error
    } 

  }




  useEffect(() => {
   
    getUser()

    getProduct()

  }, [])
  


  const getUser =async () => {
    try {
      const respond = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/user",
        { cache: "no-store", method: "GET" }
      );
  
      if (!respond.ok) {
        throw new Error("failed to fetch error");
      }
      

     const user = await respond.json()
     setusers(user.message.length)
    // console.log(user.message.length)
      
    
    } catch (error) {
      return error
    } 

  }






    const router = useRouter()
  return (
   <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
    {/* <div className="" onClick={()=> redirect('/navbar')}><HomePageHeadCard title={'sales'} icons={<AiOutlineDollar/>} desriptions={"view sales"} amount={"point of sales"} /></div> */}
    <div className="cursor-pointer"><Link href={'/sales'}> <HomePageHeadCard  title={'sales'} icons={<AiOutlineUser/>} desriptions={`sale now`} amount={"point of sales"}  /></Link></div>
    <div className="cursor-pointer"><Link href={'/profiles/user'}> <HomePageHeadCard  title={'user'} icons={<AiOutlineUser/>} desriptions={`${users} users`} amount={"Manage users"}  /></Link></div>
    {
      product ? 
   <div className="cursor-pointer"><Link href={'/product'}> <HomePageHeadCard  title={'product'} icons={<AiFillShop/>} desriptions={`${product} products`} amount={"view products"}  /></Link></div>
: 
<div className="cursor-pointer"><Link href={'/product'}> <HomePageHeadCard  title={'product'} icons={<AiFillShop/>} desriptions={`loading ... `} amount={"view products"}  /></Link></div>

    }
   <div className="cursor-pointer"><Link href={'/stock'}> <HomePageHeadCard  title={'stock'} icons={<AiOutlineImport/>} desriptions={`${0} stock`} amount={"view stock"}  /></Link></div>

   </div>
  )
}
