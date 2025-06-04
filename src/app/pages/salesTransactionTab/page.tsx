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
import { AddButton } from "./components/addButton"
import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getTransactionInterface } from "@/app/types/transaction.type"
import { backendUrl } from "@/app/utils/url"
import axios from "axios"
import PriorityTab from "@/components/ui/priorityTab"

export default function SupplierTab() {

    const [transaction, setTransaction] = useState<getTransactionInterface[]>([])

    const { data } = useQuery({
        queryKey : ["transaction"],
        queryFn : () => axios.get(backendUrl("transaction"))
    })

    useEffect(() => {
        if(data?.data)
        {
            setTransaction(data?.data)
        }
    }, [data])


    return (
        <div className=" w-full h-dvh overflow-auto"> 

            <Navbar />

            <div className="m-auto w-5/6 h-[70px] rounded-md flex gap-5 mb-5 items-center">
                <AddButton setTransaction={setTransaction} />
            </div>

            <div className="flex w-full">
                <div className="ms-5 w-[70%] overflow-auto h-[600px] shadow-md rounded-md ">
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader className="">
                            <TableRow>
                                <TableHead>date</TableHead>
                                <TableHead>customer</TableHead>
                                <TableHead>medecine</TableHead>
                                <TableHead>price</TableHead>
                                <TableHead>quantity sold</TableHead>
                                <TableHead>total</TableHead>
                                <TableHead>released by</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        
                                {
                                    transaction.map((item : getTransactionInterface, index : number) => (
                                        <TableRow key={index}>
                                            <TableCell> {item.date }</TableCell>
                                            <TableCell> {item.customer}</TableCell>
                                            <TableCell> {item.productName}</TableCell>
                                            <TableCell> {item.price}</TableCell>
                                            <TableCell> {item.quantity}</TableCell>
                                            <TableCell> {item.totalPrice}</TableCell>
                                            <TableCell> {item.cashier}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            
                        </TableBody>
                    </Table>
                </div>

                <div className="ms-5 w-[25%] overflow-auto h-[600px] shadow-md rounded-md ">
                    <PriorityTab />
                </div>

            </div>

           

           
        </div>
    )
  }
