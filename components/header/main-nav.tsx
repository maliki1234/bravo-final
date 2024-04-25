"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, useState, useEffect } from "react"
import { UrlObject } from "url"

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

import { Button } from "../ui/button"

import { Menu } from "lucide-react"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const { data: session} =  useSession()
 const [one, setone] = useState([])
//  console.log(one)
  useEffect(() => {
    
    if (props) {
      setone(props?.links)
      
    }
  // console.log(props?.links.homePage)
    
  }, [])
  

  // console.log(b)

  
  return (
    
    <>
    <nav
      className={cn("hidden md:flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {
       one.length > 0 && one.map((e: {
         class: any ;auth: any; link: string | UrlObject; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined 
})=> {
          if (e.auth) {
            let d = e.auth.split('&&')
           
            if (d[0] && d[1]) {
              if (session?.role === d[0] && session.role === d[1]) {
                return <Link key={e.name}  className={`inline-block f-full ${e.class}`}  href={e.link}>{e.name}</Link>
              }  
            }
            
            if (session?.role === d[0] ) {
              return <Link key={e.name} className={`inline-block f-full ${e.class}`} href={e.link}>{e.name}</Link>
            }  
          }
         return <Link key={e.name} className={`inline-block f-full ${e.class}`} href={e.link}>{e.name}</Link>
        })
      }
     
    </nav>
    <div className="block md:hidden">
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="outline"><Menu/></Button>
      </SheetTrigger>
      <SheetContent className="w-[12em]">
        {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
        <nav
      className={cn("flex pt-4 h-full flex-col items-right  lg:space-x-6", className)}
      {...props}
    >
      {
        one.length > 0 && one.map((e: { auth: any; link: string | UrlObject; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined })=> {
          if (e.auth) {
            let d = e.auth.split('&&')
           
            if (d[0] && d[1]) {
              if (session?.role === d[0] && session.role === d[1]) {
                return <Link href={e.link} className="py-3 text-left my-2 hover:text-primary">{e.name}</Link>
              }  
            }
            
            if (session?.role === d[0] ) {
              return <Link href={e.link} className="py-3 text-left my-2 hover:text-primary">{e.name}</Link>
            }  
          }
         return <Link href={e.link} className="py-3 text-left my-2 hover:text-primary">{e.name}</Link>
        })
      }
     
    </nav>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
    </div>
    </>
  )
}
