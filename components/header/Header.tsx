"use client"
import React from 'react'
import { Card } from '../ui/card'
import { MainNav } from './main-nav'
import { UserNav } from './user-nav'
import ModeToggle from '../theme/ModeToggle'
import Link from 'next/link'
import Logo from '../logo/Logo'
import { useSession } from 'next-auth/react'

export default function Header({links}) {

  // console.log(links)
  return (
   <>
    <Card  className='w-full flex items-center justify-between py-4'>
        <Logo/>
        <nav className='flex md:grid grid-cols-3   md:grid-cols-6'> 
<div className="cols-span-1 flex items-center md:col-span-4 col-start-1">
<MainNav links={links}/>
  </div>       
  <div className="md:col-span-1 flex justify-center items-center col-start-1">
  <UserNav />
  </div>
        {/* <ModeToggle/> */}
        </nav>
    </Card>
   </>
  )
}
