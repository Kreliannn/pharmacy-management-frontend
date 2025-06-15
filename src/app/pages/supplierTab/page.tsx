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
import PriorityTab from "@/components/ui/priorityTab"
import { getProductInterface } from "@/app/types/product.type"
import { errorAlert } from "@/app/utils/alert"
import { Input } from "@/components/ui/input"

export default function SupplierTab() {

    const [supplier, setSupplier] = useState<getSupplierInterface[]>([])
    const [filteredSupplier, setFilteredSupplier] = useState<getSupplierInterface[]>([])
    const [search, setSearch] = useState("")

    const { data } = useQuery({
        queryKey : ["supplier"],
        queryFn : () => axios.get(backendUrl("supplier"))
    })

    useEffect(() => {
        if(data?.data)
        {
            setSupplier(data?.data)
            setFilteredSupplier(data?.data)
        }
    }, [data])

    // Real-time search filter
    useEffect(() => {
        if (!search.trim()) {
            setFilteredSupplier(supplier)
        } else {
            const filtered = supplier.filter((item: getSupplierInterface) => 
                item.ProductName.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredSupplier(filtered)
        }
    }, [search, supplier])

    return (
        <div className=" w-full h-dvh overflow-auto"> 

            <Navbar />

            
            <div className="flex w-full">
                <div className=" w-[75%] ms-5 overflow-auto h-[600px] shadow-md rounded-md ">




                <div className="w-full h-[70px]rounded-md flex gap-10 items-center justify-between p-5">
                    <div className="flex w-[250px] gap-2 ">
                        <Input 
                            type={"text"} 
                            value={search} 
                            placeholder="enter medicine name" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <AddButton setSupplier={setSupplier} />
                </div>

                    <Table>
                       
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
                                <TableHead>received from</TableHead>
                                <TableHead>received by</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        
                                {
                                    filteredSupplier.map((item : getSupplierInterface, index : number) => (
                                        <TableRow key={index}>
                                            <TableCell> {item.ProductName }</TableCell>
                                            <TableCell className="max-w-[50px] overflow-hidden"> {item.description}</TableCell>
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

                <div className=" w-[21%] ms-5 overflow-auto h-[600px] shadow-md rounded-md ">
                    <PriorityTab />
                </div>

            </div>

          

           
        </div>
    )
  }