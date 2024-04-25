import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/provider/theme-provider'
import Provider from './context/Provider'
import { Toaster } from '@/components/ui/toaster'
import { GlobalProducContext } from './context/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_BRAND_NAME}`,
  manifest: "/manifest.json",
  // description: 'leo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
      <Provider>
      <body >
      
               <GlobalProducContext>

               {children}
               </GlobalProducContext>
        
     
      <Toaster />
      </body>
      </Provider>
      </ThemeProvider>

    </html>
  )
}
