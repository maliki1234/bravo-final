"use client";
import React, { useState } from "react";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useGlobalProducContext } from "@/app/context/store";

import { FaAd, FaMinus, FaPlus } from "react-icons/fa"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Ghost } from "lucide-react";
import { Input } from "@/project/components/ui/input";
import { useToast } from "../ui/use-toast";


export default function SaleesTable() {
  const {toast} = useToast()

  const { product, setProduct } = useGlobalProducContext();
  const [quantity, setquantity] = useState("171")

const router = useRouter()


const Onchange = (e:number , p: any)=>{
// console.log(e.target.value)
setquantity(e.target.value)
// console.log(p)

// if (e.target.value <= 0 ) {
//   console.log(p)
//   const filteProduct = product.filter(el => el.id != p)
//   setProduct(filteProduct)


//   return toast({title:"opps", description: "you cant sell nothing"})
  
  
// }


const prod = product.map(item =>{

  

  if (item.id === p) {
    return {
      ...item,
      quantity: e.target.value,
      Total: item.price * e.target.value
    }
  }
  return item

})
setProduct(prod)

  
}

const OnchangeTotal = (e , p)=>{

  
const prod = product.map(item =>{

  

  if (item.id === p) {
    return {
      ...item,
      quantity:  e.target.value / item.price,
      Total: e.target.value
    }
  }
  return item

})
setProduct(prod)

}


const minusOne = (id)=>{
  const producting = product.map(item =>{
    
      if (item.id === id && item.quantity >= 1) {
        

       return {
          ...item,
          quantity: item.quantity - 1,
          Total: item.price * (item.quantity -1)
        }
      }
    return item
  })
setProduct(producting)


}



const remove = (id)=>{
      const filteProduct = product.filter(el => el.id != id)
      
      setProduct(filteProduct)
}



const addOne = (id)=>{
  const producting = product.map(item =>{
    
      if (item.id === id && item.quantity <= item.maximumQuantity -1) {

       return {
          ...item,
          quantity: item.quantity + 1,
          Total: item.price * (item.quantity + 1)
        }
      }
    return item
  })


setProduct(producting)

}



  return (
    
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[70px]">No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="">Price</TableHead>
            <TableHead className="">quantity</TableHead>
            <TableHead className="">total</TableHead>
            <TableHead className="">adjust</TableHead>
            <TableHead className="">action</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
        {product &&
            product.map((product , i) => (
              <TableRow>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Input type="number" id="nb" className="w-32 " value={product.quantity} onChange={(e)=>Onchange(e , product.id)}/>
                </TableCell>
                <TableCell>
                <Input type="number" id="nb" className="w-32 " value={product.Total} onChange={(e)=>OnchangeTotal(e , product.id)}/>
                
                </TableCell>
                <TableCell> <div className="flex gap-2">
                  <div className="cursor-pointer" onClick={()=> addOne(product.id)}>
                  <FaPlus/>
                  </div>
                  <div className="cursor-pointer"  onClick={()=> minusOne(product.id)}>
                  <FaMinus/>
                  </div>
                  </div></TableCell>
                <TableCell><Button onClick={()=> remove(product.id)} variant={'ghost'}>remove</Button></TableCell>

                
              </TableRow>
            ))}
        </TableBody>
      </Table>
   
  );
}
