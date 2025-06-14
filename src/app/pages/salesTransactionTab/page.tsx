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
import { Input } from "@/components/ui/input"
import { errorAlert } from "@/app/utils/alert"
import { getProductItemSold } from "@/app/utils/customFunction"

export default function SupplierTab() {

    const [transaction, setTransaction] = useState<getTransactionInterface[]>([])
    const [filteredTransaction, setFilteredTransaction] = useState<getTransactionInterface[]>([])

    const [search, setSearch] = useState("")

    const { data } = useQuery({
        queryKey : ["transaction"],
        queryFn : () => axios.get(backendUrl("transaction"))
    })

    useEffect(() => {
        if(data?.data)
        {
            setTransaction(data?.data)
            setFilteredTransaction(data?.data)
        }
    }, [data])

    // Real-time search filter
    useEffect(() => {
        if (!search.trim()) {
            setFilteredTransaction(transaction)
        } else {
            const filtered = transaction.filter((item: getTransactionInterface) => 
                item.productName.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredTransaction(filtered)
        }
    }, [search, transaction])

    return (
        <div className=" w-full h-dvh overflow-auto"> 

            <Navbar />

      

            <div className="flex w-full">
                <div className="ms-5 w-[70%] overflow-auto h-[600px] shadow-md rounded-md ">

                <div className="w-full h-[70px] rounded-md flex gap-10  items-center justify-between p-5">
                    <div className="flex w-[250px] gap-2 ">
                        <Input 
                            type={"text"} 
                            value={search} 
                            placeholder="enter medicine name" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <AddButton setTransaction={setTransaction} />
                </div>

                    <Table>
                        
                        <TableHeader className="">
                            <TableRow>
                                <TableHead>date</TableHead>
                                <TableHead>customer</TableHead>
                                <TableHead>medicine</TableHead>
                                <TableHead>price</TableHead>
                                <TableHead>quantity sold</TableHead>
                                <TableHead>total</TableHead>
                                <TableHead>released by</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        
                                {
                                    filteredTransaction.map((item : getTransactionInterface, index : number) => (
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