"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

const FormSchema = z.object({
  product: z.coerce.number({
    required_error: "Please select a language.",
  }),
})

export default function SearchStock({prod}) {

  const [allProduct, setallProduct] = useState([])
  // console.log( 'this id' ,   allProduct)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })


  
  const getProduct = async ()=>{
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
        return data
        
      
      } catch (error) {
        return error
      }
    
}

useEffect(() => {
  

  getProduct()
    

}, [])





  function onSubmit(data: z.infer<typeof FormSchema>) {
    prod(data)
    // console.log(`this is ${data}`)
   
  }

  if(allProduct.length === 0){
    return <>
    <div className="h-screen grid items-center justify-center">
      <p>loading...</p>
    </div>
    </>
  }

  return (
    <>
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pl-2 md:pl-0 grid grid-cols-4">
       <div className="col-span-2 flex pt-6 items-center justify-end">
       <FormField
          control={form.control}
      name="product"
          render={({ field }) => (
            <FormItem className="w-64">
              
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-64 justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? allProduct.find(
                            (language: {id: number , value: string , name?: string}) => language.id === field.value
                          )?.name
                        : "Select product"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0">
                  <Command>
                    <CommandInput placeholder="Search product..." />
                    <CommandEmpty>No product found.</CommandEmpty>
                    <CommandGroup>
                      {allProduct.map((language: any) => (
                        <CommandItem
                          value={language.name}
                          key={language.id}
                          onSelect={() => {
                            form.setValue("product", language.id)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              language.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {language.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
       </div>
        <div className="flex items-center justify-right md:justify-left">
        <Button type="submit">add purchased stock</Button>
        </div>
      </form>
    </Form></>
  )
}
