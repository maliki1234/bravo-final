"use client"

import EditProduct from "@/components/product/EditProduct"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { string, z } from "zod"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}
export type Product = {
    message: any
    id: number,
    name: string,
    price: number,
    desc: string
    quantity: number

}
export type User = {
    id: string,
    role: string,
    firstName: string,
    lastName: string,
    active: boolean,
}


const activeLambda = async (e: string) => {
    // console.log(e)



    try {
        const respond = await fetch(
            process.env.NEXT_PUBLIC_URL + `/api/user/activate/${e}`,
            { cache: "no-store", method: "GET" }
        );

        if (!respond.ok) {
            throw new Error("failed to fetch error");
        }

    } catch (error) {
        return error
    }


    location.reload()

}


const remove = async (e: string) => {
    try {
        const respond = await fetch(
            process.env.NEXT_PUBLIC_URL + `/api/product/${e}`,
            { cache: "no-store", method: "DELETE" }
        );

        if (!respond.ok) {
            throw new Error("failed to fetch error");
        }

        window.location.reload()
    } catch (error) {
        return error
    }
}



const changeRole = async (e: string) => {
    try {
        const respond = await fetch(
            process.env.NEXT_PUBLIC_URL + `/api/user/role/${e}`,
            { cache: "no-store", method: "GET" }
        );

        if (!respond.ok) {
            throw new Error("failed to fetch error");
        }

        //   return window.location.reload()
    } catch (error) {
        return error
    }

    location.reload()
}

export const columns: ColumnDef<User>[] = [

    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                arial-label="Select all" />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false
    },


    {
        accessorKey: "Customer.name",
        header: ({ column }) => {
            return (
                <Button variant={'ghost'}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    customer
                    <ArrowUpDown className="ml-2 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "Product.name",
        header: "product ",
    },
    {
        accessorKey: "quantity",
        header: "quantity ",
    },
    {
        accessorKey: "price",
        header: "price ",
    },
    {
        accessorKey: "totalPrice",
        header: "total",
    },
    {
        accessorKey: "state",
        header: ({ column }) => {
            return (
                <Button variant={'ghost'}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    state
                    <ArrowUpDown className="ml-2 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "quantity",
        header: "quantity ",
    },
    

    {
        accessorKey: "category.name",
        header: ({ column }) => {
            return (
                <Button variant={'ghost'}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    category
                    <ArrowUpDown className="ml-2 w-4" />
                </Button>
            )
        },
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'} className="h-8 w-8 p-0">
                                <span className="sr-only">open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                                coppy category Id
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuItem onClick={() => changeRole(user.id)}> change role to {user.role === 'ADMIN' ? 'user' : 'admin'}</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => activeLambda(user.id)}> {user.active ? 'deactivate' : "activate"}</DropdownMenuItem>
                            <DropdownMenuSeparator /> */}
                            <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Edit product</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-center">Edit product</DialogTitle>
                                <DialogDescription>
                                    Make changes to your product here. Click update when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <EditProduct user={user}/>
                        </DialogContent>
                    </Dialog>
                            {/* <DropdownMenuItem onClick={() => remove(user.id)}> remove product</DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    




                </>


            )
        }
    },

]
