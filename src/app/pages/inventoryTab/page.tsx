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
import { sampleStandardDeviation, classifyDemand, calculateSafetyStock } from "@/app/utils/customFunction"
import StatusBadge from "./components/status"
import PriorityTab from "@/components/ui/priorityTab"

export default function SupplierTab() {

    const [product, setProduct] = useState<getProductInterface[]>([])

    const [carryingCost, setCarryingCost] = useState(100)
    const [holdingCost, setHoldingCost] = useState(100)

    const setValue = (c : number, h : number) => {
        setCarryingCost(c)
        setHoldingCost(h)
    }

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
               <EditButton  setProduct={setProduct} setValue={setValue} />
            </div>

            <div className="flex w-full">
                <div className="ms-5 w-[70%] overflow-auto h-[600px] shadow-md rounded-md ">
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>name of medecine</TableHead>
                                <TableHead>type</TableHead>
                                <TableHead>remaining quantity</TableHead>
                                <TableHead>demand variability</TableHead>
                                <TableHead>status</TableHead>
                                <TableHead>reorder point</TableHead>
                                <TableHead>safety stock</TableHead>
                                <TableHead>order quantity</TableHead>
                              
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            
                            {
                                    product.map((item : getProductInterface, index : number) => {
                                        const averageDemand = (item.year2022 + item.year2023 + item.year2024) / 3
                                        const stdev = sampleStandardDeviation(item.year2022 , item.year2023 , item.year2024)
                                        const cv = stdev / averageDemand
                                        const demandVariability = classifyDemand(cv)
                                        const safetyStock = calculateSafetyStock(stdev)

                                        const dailyDemand = averageDemand / 365

                                        const reorderPoint = dailyDemand * 14 + safetyStock

                                        let status

                                        if (item.quantity <= safetyStock) status = "Reorder req'd"
                                        else if (item.quantity >= reorderPoint) status = "Sufficient"
                                        else status = "Reorder"

                                        let orderQuantity 

                                        if(demandVariability == "Highly Variable")
                                        {
                                            orderQuantity = (2 * averageDemand * item.cost ) / carryingCost 
                                        }
                                        else
                                        {

                                        }
                                        
                                        

                                        return(
                                            <TableRow key={index}>
                                                <TableCell> {item.productName }</TableCell>
                                                <TableCell> {item.type}</TableCell>
                                                <TableCell> {item.quantity}</TableCell>
                                                <TableCell> {demandVariability}</TableCell>
                                                <TableCell>     
                                                    <StatusBadge status={status} />
                                                </TableCell>
                                                <TableCell> {reorderPoint.toFixed(0)}</TableCell>
                                                <TableCell> {safetyStock.toFixed(0)}</TableCell>
                                                <TableCell> {carryingCost}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }


                        
                        </TableBody>
                    </Table>
                </div>


                <div  className="ms-5 w-[25%] overflow-auto h-[600px] shadow-md rounded-md ">
                                <PriorityTab />
                </div>
            </div>

            

           
        </div>
    )
  }