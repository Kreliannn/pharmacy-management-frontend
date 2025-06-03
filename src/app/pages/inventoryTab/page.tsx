"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Link from "next/link"
import Navbar from "@/components/ui/navbar"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { backendUrl } from "@/app/utils/url"
import { getProductInterface } from "@/app/types/product.type"
import axios from "axios"
import { EditButton } from "./components/editButton"


export default function SupplierTab() {

    const [product, setProduct] = useState<getProductInterface[]>([])

    const { data } = useQuery({
        queryKey : ["product"],
        queryFn : () => axios.get(backendUrl("product"))
    })

    useEffect(() => {
        if(data?.data)
        {
            setProduct(data?.data)
        }
    }, [data])

    return (
        <div className=" w-full h-dvh overflow-auto"> 

            <Navbar />

            <div className="m-auto w-5/6 h-[70px] shadow-md rounded-md flex gap-5 mb-5 items-center">
               
            </div>

            <div className="m-auto w-5/6 h-[600px] shadow-md rounded-md ">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>name of medecine</TableHead>
                            <TableHead>type</TableHead>
                            <TableHead>remaining quantity</TableHead>
                            <TableHead>status</TableHead>
                            <TableHead>reorder point</TableHead>
                            <TableHead>safety stock</TableHead>
                            <TableHead>order quantity</TableHead>
                            <TableHead>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         
                        {
                                product.map((item : getProductInterface, index : number) => (
                                    <TableRow key={index}>
                                        <TableCell> {item.productName }</TableCell>
                                        <TableCell> {item.type}</TableCell>
                                        <TableCell> {item.quantity}</TableCell>
                                        <TableCell> {item.status}</TableCell>
                                        <TableCell> {"null"}</TableCell>
                                        <TableCell> {"null"}</TableCell>
                                        <TableCell> {"null"}</TableCell>
                                        <TableCell> 
                                            <EditButton setProduct={setProduct} product={item} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }


                       
                    </TableBody>
                </Table>
            </div>

           
        </div>
    )
  }