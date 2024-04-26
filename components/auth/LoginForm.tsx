
"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'



 
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn} from "next-auth/react"
import { useToast } from '../ui/use-toast'
import { baseUrl } from '@/app/page'
 
const formSchema = z.object({
  phoneNumber: z.coerce.number(),
  password: z.string().min(2, {message: 'Please enter your password'})

})
export default function LoginForm() {
  const [loginLink, setloginLink] = useState(false)

  const router = useRouter()
  const {toast}= useToast()

  async function getAdmin() {
    const response = await fetch( baseUrl + '/api/user/getAdmin', {
      method: 'GET',
      cache: "no-store"
    })
    if (!response.ok){
      return setloginLink(true)
    }
    return setloginLink(false)
  }
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          
        },
      })

      useEffect(() => {
        getAdmin()
      }, [])
      
      async function onSubmit(values: z.infer<typeof formSchema>) {
       
        const singInData =  await signIn('credentials', {
          phoneNumber: values.phoneNumber,
          password:values.password,
          redirect: false
      } )

      if (singInData?.error) {
          toast({
            variant:"destructive",
            title: "Error",
            description: singInData?.error
          })
      }      
      else {
          router.push('/')
      }
      }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
        <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>passsword</FormLabel>
            <FormControl>
              <Input type='password' placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
              this is your unique password
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <Button type="submit">Submit</Button>
      {
        loginLink? <div className="flex justify-end">
        <Link href={'/auth/company/register'} className='text-xs' > dont have an account?</Link>
      </div>: ""
      }
    </form>
  </Form>
  )
}
