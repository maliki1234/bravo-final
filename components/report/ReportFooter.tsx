"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useGlobalProducContext } from "@/app/context/store";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Copy } from "lucide-react";
import { Separator } from "../ui/separator";
import { useReactToPrint } from "react-to-print";
import Link from "next/link";
import { da } from "date-fns/locale";
// import { toast } from '../ui/use-toast';

export default function ReportFooter({ pro , day }) {
  // console.log(pro);
  // const toast = useToast()
  const { toast } = useToast();
  const componentRef = useRef();
  const router = useRouter();
  const [first, setfirst] = useState<number>(0);
  const [profit, setprofit] = useState<number>(0);
  const [expenditure, setexpenditure] = useState<number>(0);
  // const { product, setProduct } = useGlobalProducContext();
  const { data: session } = useSession();
 

  // console.log(session)

  const getReportByDate = async(date:any) => {
    
    try {
      const respond = await fetch(
        process.env.NEXT_PUBLIC_URL + `/api/expenditure/${day}`,
        { cache: "no-store", method: "GET" }
      );
  
      if (!respond.ok) {
        throw new Error("failed to fetch error");
      }
  
      const data = await respond.json();
      const dt = data.message
      console.log(dt)
      const sum = dt.reduce((accumulator, object) => {
        return accumulator + object.price;
      }, 0);
  


       setexpenditure(sum)
      return data.message
      
    
    } catch (error) {
      return error
    }

  }

  useEffect(() => {

    if(pro){
      // console.log(pro)
      getReportByDate(day)
    }
    console.log(pro)
    const sum:number = pro.reduce((accumulator: any, object: { totalPrice: any; }) => {
      return accumulator + parseInt(object.totalPrice);
    }, 0);

      console.log( sum)
    setfirst(sum);

    const totalProfit:number = pro.reduce((accumulator, object) => {
      return accumulator + parseInt(object.profit);
    }, 0);

    //   console.log( sum)
    setprofit(totalProfit);
  }, [pro]);

  return (
    <>
      <Card className="fixed w-full py-2 grid grid-cols-1 right-0 md:grid-cols-5 bottom-0">
        <div className="col-span-4"></div>
        <div className="cols=-span-1">
          <div className="grid px-2 py-1 gap-y-1 grid-cols-2">
            <div className="uppercase font-bold text-base">total</div>
            <div className="uppercase font-bold text-base">{first}</div>
            <div className="uppercase font-bold text-base">profit</div>
            <div className="uppercase font-bold text-base">{profit}</div>
          </div>
          <div className="px-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-11/12">General Report</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-primary uppercase text-center">{session?.BusinessInfo.name}</DialogTitle>
                  <DialogDescription className="text-center text-secondary-foreground">
                   this is daily general report
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        total sales
                    </Label>
                    <div className="col-span-2">
                        { first }
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      expenditures
                    </Label>
                    <div className="col-span-2">
                        { expenditure }
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right capitalize">
                     Net profit
                    </Label>
                    <div className="col-span-2">
                        { first - expenditure }
                    </div>
                  </div>
                 
                </div>
                <DialogFooter>
                  <Button >print</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
    </>
  );
}
