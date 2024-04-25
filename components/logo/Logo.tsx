// import { authOptions } from '@/lib/auth'
// import { getServerSession } from 'next-auth'
"use client"
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'




export default function Logo() {
  const { data: session , status } = useSession()
   

    // )
    // console.log(session)

// text-[#075985] 
  return (
    <div><Link href={"/"} ><h3 className="text-2xl text-primary font-black uppercase px-12">
      {/* <Image src={'/../../static/image/BRAVO.png'} width={50} height={200} alt='sjddhfkj'/> */}
      {session? session?.Business : process.env.NEXT_PUBLIC_BRAND_NAM}
      {/* logo */}
      </h3></Link></div>
  )
}
