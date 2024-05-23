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
import { redirect } from "next/navigation"
import Header from "@/components/header/Header"
import { sales } from "@/lib/link"



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




  return (
   
        <div className="grid  grid-cols-1 md:grid-cols-9">
          <div className="hidden z-10 md:flex md:col-span-1">
           <SideBar />
          </div>
          <div className="col-span-8">
            <div className='relative h-screen'>
            <Header links={sales}/>
              {children}
            </div >
          </div>
        </div>
       
  )
}