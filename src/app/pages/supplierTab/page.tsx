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
import { AddButton } from "./components/add"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getSupplierInterface } from "@/app/types/supplier.type"
import { backendUrl } from "@/app/utils/url"
import axios from "axios"

export default function SupplierTab() {

    const [supplier, setSupplier] = useState<getSupplierInterface[]>([])

    const { data } = useQuery({
        queryKey : ["supplier"],
        queryFn : () => axios.get(backendUrl("supplier"))
    })

    useEffect(() => {
        if(data?.data)
        {
            setSupplier(data?.data)
        }
    }, [data])


    return (
        <div className=" w-full h-dvh overflow-auto"> 

            <Navbar />

            <div className="m-auto w-5/6 h-[70px]rounded-md flex gap-5 mb-5 items-center">
                <AddButton setSupplier={setSupplier} />
            </div>

            <div className="m-auto w-5/6 h-[600px] shadow-md rounded-md ">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader className="">
                        <TableRow>
                            <TableHead>medicine name</TableHead>
                            <TableHead>description</TableHead>
                            <TableHead>type</TableHead>
                            <TableHead>cost per piece</TableHead>
                            <TableHead>quantity</TableHead>
                            <TableHead>total cost</TableHead>
                            <TableHead>date ordered</TableHead>
                            <TableHead>received</TableHead>
                            <TableHead>expiry date</TableHead>
                            <TableHead>supplier name</TableHead>
                            <TableHead>received by</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       
                            {
                                supplier.map((item : getSupplierInterface, index : number) => (
                                    <TableRow key={index}>
                                        <TableCell> {item.ProductName }</TableCell>
                                        <TableCell> {item.description}</TableCell>
                                        <TableCell> {item.type}</TableCell>
                                        <TableCell> {item.cost}</TableCell>
                                        <TableCell> {item.quantity}</TableCell>
                                        <TableCell> {item.totalCost}</TableCell>
                                        <TableCell> {item.orderedDate}</TableCell>
                                        <TableCell> {item.orderedReceived}</TableCell>
                                        <TableCell> {item.expirydDate}</TableCell>
                                        <TableCell> {item.supplierName}</TableCell>
                                        <TableCell> {item.receivedBy}</TableCell>
                                    </TableRow>
                                ))
                            }
                        
                    </TableBody>
                </Table>
            </div>

           
        </div>
    )
  }
