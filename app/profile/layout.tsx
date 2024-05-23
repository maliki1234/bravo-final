// import SideBar from "@/components/SideBar"
// import StockNavbar from "@/components/stock/StockNavbar"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"
// import Provider from "../context/Provider"
// import { Theme/Provider } from "@/components/theme-provider"
import Provider from "@/app/context/Provider"
import { ThemeProvider } from "@/components/provider/theme-provider"
import SideBar from "@/components/sidebar/SideBar"
// import Header from "@/components/product/Header"
import { Toaster } from "@/components/ui/toaster"
// import Header from "@/components/product/Header"
import Link from "next/link"
// import Header from "@/components/product/Header"
import { redirect } from "next/navigation"
import Header from "@/components/header/Header"
import { profile } from "@/lib/link"
// import Header from "@/components/header/Header"


const inter = Inter({ subsets: ['latin'] })
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  if(session === null){
    redirect('/auth/login')
  }

  // if (session ) {
  //   const { role } = session
  //   if (role != "ADMIN") {
  //     return(
  //       <div className="w-ful h-screen grid items-center justify-center">
  //         <div className="p-4">
  //           <h3 className="text-center">your not authorised to open this page </h3>
  //           <Link className='text-center w-full text-blue-500' href="/sales">go to sales</Link>
  //         </div>
  //       </div>
  //     )
  //   }
  // }

  return (
    
        <div className="grid md:grid-cols-9">
          <div className="hidden md:block md:col-span-1">
           <SideBar />
          </div>
          <div className="md:col-span-8">
            <div className='relative h-screen'>
            <Header links={profile}/>
              {children}
            </div >
          </div>
        </div>
       
  )
}