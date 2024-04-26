"use client"
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {  useToast } from '../ui/use-toast'
// import { useRouter } from 'next/router'

const formSchema = z.object({
  firstName: z.string().min(2, {message: 'Please enter your last name'}),
  lastName: z.string().min(2, {message: 'Please enter your last name'}),
  phoneNumber: z.coerce.number(),
  role:z.enum(['SUPERVISOR','EMPLOYEE','ADMIN']).nullable(),
  password: z.string().min(2, {message: 'Please enter your password'}),
})
export default function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    role: 'ADMIN'
  },
})

async function onSubmit(values: z.infer<typeof formSchema>) {
  
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
        'Content-Type': "application/json"
    },
    body:JSON.stringify(values)
})
if (response.ok) {
    // console.log(response)
    const b = await response.json()
    toast({
      title: "congratulation",
      description:`${b.message}`
  })
    router.push('/auth/login')
   
} else {
    // console.error("Registrantion failed")
    // console.log(response.json())
    const b = await response.json()
    // console.log(b)
    toast({
        variant: 'destructive',
        title: "ooops",
        description: `${b.message}`,
    })
}
}
  return (
    <>
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type='number' placeholder="0123456789" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
            />
            {/* <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
            <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                this is your unique password
              </FormDescription>
              <FormMessage />
            </FormItem>)}
            /> 
             <Button type="submit">Submit</Button>
             <div className="flex justify-end">
        <Link href={'/auth/login'} className='text-xs' > have an account?</Link>
      </div> 
            </form>
    </Form>
    </>
  )
}
