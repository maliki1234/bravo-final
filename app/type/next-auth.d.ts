import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  
  */
 interface User{
  id: string | number;
  pNumber: string,
  role: String
 }


  interface Session {
    user: User & {
    role: String,
    pNumber: String,
    Businness: String
    } 
    token: {
      pNumber:String,
      role: String,
      Businness: String
    }
  }
}