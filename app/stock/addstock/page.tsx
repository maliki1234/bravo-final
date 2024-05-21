"use client"

import SearchStock from '@/components/stock/addstock/searchstock'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm, SetFieldValue } from 'react-hook-form'
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'

const formSchema = z.object({
  price: z.coerce.number().min(2, { message: 'Please enter the product name' }),
  quantity: z.coerce.number().min(2, { message: 'Please enter' }),
  // pricePerItem: z.coerce.number().min(2, { message: 'Please enter the price per item' }),
  expire: z.date({
    required_error: "A date of birth is required.",
  }),
})

export default function page() {
  const [allProduct, setallProduct] = useState([])
  const [product, setproduct] = useState()
  // console.log( `this is prosuct ${product}`)
  const [isLoading, setisLoading] = useState(false)
  const {toast } = useToast()
  const router = useRouter()
  const { data: session } = useSession()

 
  
  // console.log(product)
  // console.log(Object.keys(product).length)
  const [quantity, setquantity] = useState(0)
  const [price, setprice] = useState(0)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pricePerItem: quantity / price
    },


  })

  const getProduct = async () => {
    try {
      const respond = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/product",
        { cache: "no-store", method: "GET" }
      );

      if (!respond.ok) {
        throw new Error("failed to fetch error");
      }

      const data = await respond.json();
      // return data.message
      setallProduct(data.message)


    } catch (error) {
      return error
    }

  }
useEffect(()=>{
//  console.log(session)

},[session])

  useEffect(() => {

      getProduct()
    
  }, [])


  useEffect(() => {
    const b = price / quantity
  }, [form])





  const addStock = async (value: z.infer<typeof formSchema>) => {
    
    value.UserId = parseInt(session.id)
    value.ProductId = parseInt(product.id)
    // console.log(value)

   try {
    const response = await fetch('/api/stock', {
      method: 'POST',
      headers: {
          'Content-Type': "application/json"
      },
      body:JSON.stringify(value)
  })
  if (response.ok) {
      // console.log(response)
      const b = await response.json()
      toast({
        title: "congratulation",
        description:`${b.message}`
    })
      router.push('/stock')
      router.refresh()

  }
   } catch (error) {
    toast({
      title: "congratulation",
      description: "error"
  })
   }
 
}
    const producId = (e) => {
      // console.log(e)
      const products = allProduct.find(data => data.id === e.product)

      if (products) {
      // console.log(products)
        setproduct(products)
      }
    }
 
    return (
      <>
        <div className="py-6">
          <SearchStock prod={producId} />
        </div>
       {product?  <Form {...form}>
          <form onSubmit={form.handleSubmit(addStock)}>
            {
              isLoading ? <div className="">please select product to add stock</div> : <div className="w-full grid justify-center text-3xl text-[#s2b5876]"> add stock for {product.name}</div>
            }
            <div className="grid px-3 grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      total buying  price
                    </FormLabel>
                    <FormControl>
                      <Input type='number' onChangeCapture={e => setprice(e.currentTarget.value)} placeholder='please the price' {...field} />
                    </FormControl>
                  </FormItem>
                )} />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      quantity
                    </FormLabel>
                    <FormControl>
                      <Input type='number' onChangeCapture={e => setquantity(e.currentTarget.value)} placeholder='please enter quantity' {...field} />
                    </FormControl>
                  </FormItem>
                )} />

              <div className="flex flex-col">
                <Label className="py-3">buying price per item</Label>
                <div className="grid rounded-md border px-4 border-[#2b5876] text-center py-2">{price / quantity} Tsh</div>
              </div>
              <FormField
                control={form.control}
                name="expire"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>expire date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}

                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )} />
              <div className="flex flex-col">
                <Label className="py-3">total seling price</Label>
                <div className="grid rounded-md border px-4 border-[#2b5876] text-center py-2">{product.price * quantity} Tsh</div>

              </div>

              <div className="flex flex-col">
                <Label className="py-3">seling price per item</Label>
                <div className="grid rounded-md border px-4 border-[#2b5876] text-center py-2">{product.price} Tsh</div>

              </div>
              <div className="flex flex-col">
                <Label className="py-3">profit per item</Label>
                <div className="grid rounded-md border px-4 border-[#2b5876] text-center py-2">{product.price - price / quantity} Tsh <span>{(product.price - price/quantity)/(price/quantity)* 100}%</span></div>

              </div>
              <div className="flex flex-col">
                <Label className="py-3">total profit</Label>
                <div className="grid rounded-md border px-4 border-[#2b5876] text-center py-2">{product.price * quantity - price} Tsh</div>

              </div>
              <Button type="submit">add stock</Button>
            </div>
          </form>

        </Form>: <div className="grid items-center justify-center"> please add product</div>
        }
      </>
    )
  }

