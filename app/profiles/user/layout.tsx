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
import Header from "@/components/header/Header"
import { Toaster } from "@/components/ui/toaster"
import { redirect } from "next/navigation"
import Link from "next/link"
import { profiles } from "@/lib/link"


const inter = Inter({ subsets: ['latin'] })
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const session = await getServerSession(authOptions)


  const session = await getServerSession(authOptions)
  if(session === null){
    redirect('/auth/login')
  }

  if (session ) {
    const { role } = session
    if (role === "EMPLOYEE" ) {
      return(
        <div className="w-ful h-screen grid items-center justify-center">
          <div className="p-4">
            <h3 className="text-center">your not authorised to open this page </h3>
            <Link className='text-center w-full text-blue-500' href="/sales">go to sales</Link>
          </div>
        </div>
      )
  }
}
  return (
    <html lang="en">
      <Provider>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
        <div className="grid grid-cols-1 md:grid-cols-9">
          <div className=" hidden md:block  col-span-1">
           <SideBar />
          </div>
          <div className="col-span-8">
            <div className='relative h-screen'>
            <Header links={profiles}/>
              {children}
              
            </div >
          </div>
        </div>
        <Toaster />
        </ThemeProvider>
      </body>
      </Provider>
    </html>
  )
}