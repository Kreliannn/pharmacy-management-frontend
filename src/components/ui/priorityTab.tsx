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


export default function PriorityTab() {

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
      

                    <Table>
                       
                        <TableHeader>
                            <TableRow>
                                <TableHead>name</TableHead>
                                <TableHead>type</TableHead>
                                <TableHead>price</TableHead>
                                <TableHead>quantity</TableHead>
                               
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            
                            {
                                    product.filter((item) => ["AE", "AN", "AV", "BV", "CV"].includes(item.type) ).map((item : getProductInterface, index : number) => (
                                        <TableRow key={index}>
                                            <TableCell> {item.productName }</TableCell>
                                            <TableCell> {item.type}</TableCell>
                                            <TableCell> {item.price}</TableCell>
                                            <TableCell> {item.quantity}</TableCell>
                                        </TableRow>
                                    ))
                                }


                        
                        </TableBody>
                    </Table>
               
    )
  }
