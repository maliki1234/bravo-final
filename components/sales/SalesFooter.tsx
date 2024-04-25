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
import { Copy } from 'lucide-react';
import { Separator } from '../ui/separator';
import { useReactToPrint } from 'react-to-print';
// import { toast } from '../ui/use-toast';

export default function SalesFooter() {
    const { toast } = useToast()
    const componentRef = useRef();
    const router = useRouter()
    const [first, setfirst] = useState<number>(0)
    const { product, setProduct } = useGlobalProducContext();
    const [print, setprint] = useState([])
    const [tot, settot] = useState<number>(0)
    
   
    const { data: session } = useSession(
      
    )
    

    useEffect(() => {
        
        if (product) {
            const sum = product.reduce((accumulator, object) => {
                return accumulator + object.Total;
            }, 0);

            //   console.log( sum)
            setfirst(sum)
        }


    }, [product])


    const pay = async () => {
        
        setprint(product)
        settot(first)
        
        if(product.length === 0) {
            return toast({
                
                title: 'error',
                description:" please add product to sell",
                variant:"destructive"
                
            })
        }
        product.forEach(async element => {
            
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
                            print.length > 0 ?  <DialogContent className="sm:max-w-md">
                                
                            <div ref={componentRef} className="flex flex-col  w-full justify-center">
                                <Label className="text-center text-primary uppercase py-3">{session.Business}</Label>

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
                        </DialogContent>:""
                           }
                        </Dialog>

                    </div>
                </div>
            </Card>
        </>

    )
}
