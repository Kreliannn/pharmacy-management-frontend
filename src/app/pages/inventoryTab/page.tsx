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
import { errorAlert } from "@/app/utils/alert"
import { Input } from "@/components/ui/input"

export default function SupplierTab() {

    const [product, setProduct] = useState<getProductInterface[]>([])

    const [carryingCost, setCarryingCost] = useState(0)
    const [orderingCost, setOrderingCost] = useState(0)
    const [stockCost, setStockCost] = useState(0)


    const [search, setSearch] = useState("")

    const handleSearch = () => {
        if(!search) return errorAlert("empty field")
        setProduct((prev) => prev.filter((item : getProductInterface) => item.productName == search ))
    }

    const setValue = (c : number,  o : number, s : number) => {
        setCarryingCost(c)
        setOrderingCost(o)
        setStockCost(s)
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

            
            <div className="flex w-full">
                <div className="ms-5 w-[70%] overflow-auto h-[600px] shadow-md rounded-md ">


                    <div className="w-full h-[70px]  rounded-md flex gap-10 items-center justify-between p-5">
                        <div className="flex w-[250px] gap-2 ">
                            <Input type={"text"} value={search} placeholder="enter medecine name" onChange={(e) => {
                                const value = e.target.value
                                setSearch(value)
                                if(value == "") setProduct(data?.data)
                            }}/>
                            <Button onClick={handleSearch}> Search </Button>
                        </div>

                        <EditButton  setProduct={setProduct} setValue={setValue} />
                    </div>

                    <Table>
            
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
                                            orderQuantity = Math.sqrt((2 * 14 * orderingCost) / stockCost);
                                        }
                                        else
                                        {
                                            orderQuantity = (2 * averageDemand * orderingCost ) / carryingCost 
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
                                                <TableCell> {orderQuantity.toFixed(0)}</TableCell>
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