"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { useGlobalProducContext } from '@/app/context/store';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Check, ChevronsUpDown, Copy } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useReactToPrint } from 'react-to-print';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '../ui/command';
import { cn } from '@/lib/utils';
// import { ScrollArea } from '@radix-ui/react-scroll-area';
// import { toast } from '../ui/use-toast';

const formSchema = z.object({
    name: z.string().min(2).max(40),
    phoneNumber: z.coerce.number(),
    paidAmount: z.coerce.number()
})





interface Icustomer {
    id: number,
    name: string,
    phoneNumber: number
}

export default function SalesFooter() {
    const { toast } = useToast()
    const componentRef = useRef();
    const router = useRouter()
    const [first, setfirst] = useState<number>(0)
    const { product, setProduct } = useGlobalProducContext();
    const [print, setprint] = useState([])
    const [tot, settot] = useState<number>(0)
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")


    const { data: session } = useSession(

    )
    const [customerArr, setcustomerArr] = useState<Icustomer[]>([])
    const [formDetails, setformDetails] = useState({ name: "", phoneNumber: 0 })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

        values: {
            name: formDetails.name,
            phoneNumber: formDetails.phoneNumber,
            paidAmount: 0
        }
    })




    useEffect(() => {



        const getCustomer = async () => {
            const customer = await fetch("api/customer", {
                method: 'GET',
                cache: "no-store"
            })

            const b = await customer.json()

            if (!customer.ok) {

                return null
            }

            // console.log(b.message)
            setcustomerArr(b.message)
        }


        getCustomer()

    }, [])


    useEffect(() => {

        if (product) {
            const sum = product.reduce((accumulator, object) => {
                return accumulator + object.Total;
            }, 0);

            //   console.log( sum)
            setfirst(sum)
        }


    }, [product])

    const payL = async () => {
        settot(first)
        const findzero = await product.find(i => i.quantity <= 0)

        if (findzero) {
            return toast({
                title: "!opps",
                description: `please make sure ${findzero.name} is more than one`,
                variant: "destructive"
            })
        }

        setprint(product)
    }


    const pay = async () => {
        settot(first)

        const findzero = await product.find(i => i.quantity <= 0)

        if (findzero) {
            return toast({
                title: "!opps",
                description: `please make sure ${findzero.name} is more than one`,
                variant: "destructive"
            })
        }

        setprint(product)
        if (product.length === 0) {
            return toast({

                title: 'error',
                description: " please add product to sell",
                variant: "destructive"

            })
        }
        product.forEach(async element => {

            // console.log(element.quantity)


            element.user = parseInt(session.id)

            const response = await fetch('/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(element)
            })
            const b = await response.json()
            if (response.ok) {

                toast({
                    title: "congratulation",
                    description: `${b.message}`
                })
                setProduct([])

            } else {

                toast({
                    variant: 'destructive',
                    title: "ooops",
                    description: `${b.message}`,
                })
            }


        });
    }

    const payLater = async (value: z.infer<typeof formSchema>) => {

        const createCustome = await fetch(process.env.NEXT_PUBLIC_URL + 'api/customer',{
            method: 'POST',
            body: JSON.stringify(value)
        })

        let g = await createCustome.json()
        if (!createCustome) {
            return null
        }

        console.log(g)
        product.forEach(async element => {
            let c = {
                ...element,
                customerId: g.message?.id
               
            }
            const response = await fetch('/api/deni', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(c)
            })
            const b = await response.json()
            if (response.ok) {

                toast({
                    title: "congratulation",
                    description: `${b.message}`
                })
                setProduct([])

            } else {

                toast({
                    variant: 'destructive',
                    title: "ooops",
                    description: `${b.message}`,
                })
            }


        })
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,

    })

    return (
        <>

            <Card className='fixed w-full fixed left-0 py-2 grid grid-cols-1 md:grid-cols-5 bottom-0'>
                <div className="col-span-4"></div>
                <div className="cols=-span-1">
                    <div className="grid px-2 py-1 gap-y-1 grid-cols-2">
                        <div className="uppercase font-bold text-base">
                            total
                        </div>
                        <div className="uppercase font-bold text-base">
                            {first}
                        </div>
                        <div className="uppercase font-bold text-base">
                            discount
                        </div>
                        <div className="uppercase font-bold text-base">
                            0
                        </div>
                    </div>
                    <div className="px-2">

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button type='submit' onClick={() => pay()} className='w-full h-12'>pay now</Button>

                            </DialogTrigger>
                            {
                                print.length > 0 ? <DialogContent className="sm:max-w-md">

                                    <div ref={componentRef} className="flex flex-col  w-full justify-center">
                                        <Label className="text-center text-primary uppercase py-3">{session?.Business}</Label>

                                        <Separator />
                                        <div className="py-6"></div>
                                        {print.map(product => (
                                            <div className="grid py-3 grid-cols-2">
                                                <div className="flex justify-start">
                                                    {product.name}
                                                </div>
                                                <div className="flex justify-end">
                                                    {product.price}
                                                </div>
                                            </div>
                                        ))}
                                        <Separator />

                                        <div className="grid py-6 grid-cols-2">
                                            <div className="flex justify-start">
                                                Total
                                            </div>
                                            <div className="flex justify-end">
                                                {tot}
                                            </div>
                                        </div>
                                        <div className="py-6 grid justify-center">
                                            <Label className='capitalize'>thank you for shoping</Label>
                                        </div>
                                    </div>
                                    <DialogFooter className="sm:justify-between">
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                                Close
                                            </Button>
                                        </DialogClose>
                                        <Button onClick={handlePrint} type="submit">print</Button>
                                    </DialogFooter>
                                </DialogContent> : ""
                            }
                        </Dialog>



                        {/*ANOTHE DIALOG  */}

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button type='submit' onClick={() => payL()} variant={'outline'} className='w-full h-12'>pay later</Button>

                            </DialogTrigger>

                            {
                                print.length > 0 ? <DialogContent className="sm:max-w-md">

                                <div ref={componentRef} className="flex flex-col  w-full justify-center">
                                    <Label className="text-center text-primary uppercase py-3">{session?.Business}</Label>

                                    <Separator />

                                    <div className="py-6"></div>
                                    {print.map(product => (
                                        <div className="grid py-3 grid-cols-2">
                                            <div className="flex justify-start">
                                                {product.name}
                                            </div>
                                            <div className="flex justify-end">
                                                {product.price}
                                            </div>
                                        </div>
                                    ))}
                                    <Separator />

                                    <div className="py-2"></div>
                                    <h3 className="text-center text-primary capitalize">customer info</h3>

                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                            >
                                                {value
                                                    ? customerArr.find((framework) => framework.name === value)?.name
                                                    : "search if user exist..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput className='w-full' placeholder="Search for existing user..." />
                                                <CommandEmpty>No customer .</CommandEmpty>
                                                <CommandGroup>
                                                    {customerArr.map((framework) => (
                                                        <CommandItem
                                                            key={framework.phoneNumber}
                                                            value={framework.name}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setOpen(false)
                                                                let b = {
                                                                    name: framework.name,
                                                                    phoneNumber: framework.phoneNumber
                                                                }
                                                                setformDetails(b)
                                                            }}
                                                        >
                                                            <Check
                                                                className={cn(
                                                                    "mr-2 h-4 w-4",
                                                                    value === framework.name ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                            {framework.name}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                    <Form {...form} >
                                        <form className='grid gap-4' onSubmit={form.handleSubmit(payLater)}>
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>full name</FormLabel>
                                                        <FormControl>
                                                            <Input type='text' placeholder='please enter customer name' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="phoneNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>phone Number</FormLabel>
                                                        <FormControl>
                                                            <Input type='number' placeholder='please enter customer phone number' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                             <FormField
                                                control={form.control}
                                                name="paidAmount"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>paid</FormLabel>
                                                        <FormControl>
                                                            <Input type='number' placeholder='only if amount paid' {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type='submit'> record</Button>
                                        </form>
                                    </Form>

                                    <Separator />


                                    <div className="grid py-6 grid-cols-2">
                                        <div className="flex justify-start">
                                            Total
                                        </div>
                                        <div className="flex justify-end">
                                            {tot}
                                        </div>
                                    </div>
                                    {/* <div className="py-6 grid justify-center">
                                    <Label className='capitalize'>thank you for shoping</Label>
                                </div> */}
                                </div>
                                {/* <DialogFooter className="sm:justify-between">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                                <Button onClick={handlePrint} type="submit">print</Button>
                            </DialogFooter> */}
                            </DialogContent>:""
                            }



                        </Dialog>

                    </div>
                </div>
            </Card>
        </>

    )
}
