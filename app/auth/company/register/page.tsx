"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signOut } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z  from 'zod'


const formSchema = z.object({
  name: z.string().min(2, {message: 'Please enter your last name'}),
  description: z.string().optional()
  
})
export default function page() {
  const router = useRouter()
  const { toast } = useToast()

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    
  },
})

async function onSubmit(values: z.infer<typeof formSchema>) {
 

  
  const response = await fetch('/api/business', {
    method: 'POST',
    headers: {
        'Content-Type': "application/json"
    },
    body:JSON.stringify(values)
})
if (response.ok) {
    const b = await response.json()
    toast({
      title: "congratulation",
      description:`${b.message}`
  })
   
    // signOut()
  return router.push('/auth/register')
   
} else {
    const b = await response.json()
    toast({
        variant: 'destructive',
        title: "ooops",
        description: `${b.message}`,
    })
}
}

const clearBusiness = async() => {
  const deletion = await fetch('/api/business' , {
    method: 'DELETE',
  })
  if (deletion.ok) {
    const dele = await deletion.json()
    toast({
      title: "deleted",description: dele.message
    })
  }

  preventDefault()
  
}

  return (
    <>
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business name</FormLabel>
              <FormControl>
                <Input placeholder="ei . Microsoft" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
       
       <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business description</FormLabel>
              <FormControl>
                <Textarea placeholder="write down business description" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
            <div className="py-4 flex justify-between">
            <Button type="submit">Submit</Button>
            <div className='text-red-700 cursor-pointer'  onClick={()=>clearBusiness()}> clear all business info</div>
            </div>
        
            </form>
    </Form>
    </>
  )
}
