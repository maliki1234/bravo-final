

"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const formschema = z.object({
  password: z.string()
})


export default function page() {
  const { toast} = useToast()
  const {data: session} = useSession()
  const route = useRouter()
  const form  = useForm<z.infer<typeof formschema>>(
    {
      resolver: zodResolver(formschema),
      defaultValues: {

      }
    }
  )

  const onsubmit = async(e: z.infer<typeof formschema>)=>{
    // console.log(e)
    const response = await fetch(process.env.NEXT_PUBLIC_URL + `api/user/password/${session?.id}`,{
      method: 'POST',
      body: JSON.stringify(e)
    })

    const db = await response.json()
    if (response.ok) {
      route.push('/profile/security/password')
    }else{
      
      toast({
        title: "error",
        description: db.message,
        variant: "destructive"
      })
    }

  }
  return (
    
    <>
    <div className=" w-full h-full">
     <Form {...form} >
      <form onSubmit={form.handleSubmit(onsubmit)} className='px-6 flex flex-col gap-6'>
        <h4 className="text-3xl text-primary uppercase pt-6 font-bold text-center">change passwod</h4>
      <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
      <FormItem>
              <FormLabel>current password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="password" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-left">
             <Button variant={'secondary'} type="submit">change password</Button>

            </div>
      </form>
     </Form>
    </div>
    
    </>
  )
}
