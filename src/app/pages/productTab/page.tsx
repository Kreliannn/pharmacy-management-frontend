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
import PriorityTab from "@/components/ui/priorityTab"
import { Input } from "@/components/ui/input"
import { errorAlert } from "@/app/utils/alert"
import { Badge } from "@/components/ui/badge"
import { sampleStandardDeviation, classifyDemand, calculateSafetyStock } from "@/app/utils/customFunction"

export default function SupplierTab() {

    const [product, setProduct] = useState<getProductInterface[]>([])
    const [filteredProduct, setFilteredProduct] = useState<getProductInterface[]>([])
    const [search, setSearch] = useState("")

    const { data } = useQuery({
        queryKey : ["product"],
        queryFn : () => axios.get(backendUrl("product"))
    })

    useEffect(() => {
        if(data?.data)
        {
            setProduct(data?.data)
            setFilteredProduct(data?.data)
        }
    }, [data])

    // Real-time search filter
    useEffect(() => {
        if (!search.trim()) {
            setFilteredProduct(product)
        } else {
            const filtered = product.filter((item: getProductInterface) => 
                item.productName.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredProduct(filtered)
        }
    }, [search, product])

    return (
        <div className=" w-full h-dvh overflow-auto"> 

            <Navbar />

          

            <div className="w-full flex">
                <div className="ms-5 w-[60%] h-[600px] shadow-md rounded-md overflow-auto">
                <div className=" w-full h-[70px]  rounded-md flex gap-5 mb-5 items-center">

                    <div className="flex w-[250px] gap-2 ms-5">
                        <Input 
                            type={"text"} 
                            value={search} 
                            placeholder="enter medicine name" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    </div>
                    <Table>
                        
                        <TableHeader>
                            <TableRow>
                                <TableHead>name</TableHead>
                                <TableHead>description</TableHead>
                                <TableHead>type</TableHead>
                                <TableHead>category</TableHead>
                               
                                <TableHead>price</TableHead>
                                <TableHead>quantity on hand</TableHead>
                                <TableHead>Edit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            
                            {
                                    filteredProduct.map((item : getProductInterface, index : number) => {
                                        const averageDemand = (item.year2022 + item.year2023 + item.year2024) / 3
                                        const stdev = sampleStandardDeviation(item.year2022 , item.year2023 , item.year2024)
                                        const cv = stdev / averageDemand
                                        const demandVariability = classifyDemand(cv)
                                        const safetyStock = calculateSafetyStock(stdev)

                                        const dailyDemand = averageDemand / 365

                                        const reorderPoint = dailyDemand * 14 + safetyStock

                                        let status

                                        if (item.quantity <= safetyStock) status = "Reorder"
                                        else if (item.quantity >= reorderPoint) status = "Sufficient"
                                        else status = "Reorder"
                                        return(
                                            <TableRow key={index}>
                                                <TableCell> {item.productName }</TableCell>
                                                <TableCell className="max-w-[50px] overflow-hidden">  {item.description}</TableCell>
                                                <TableCell> {item.type}</TableCell>
                                                <TableCell> {item.category}</TableCell>
                                                
                                                <TableCell>  <span className="text-green-500"> ₱{item.price} </span></TableCell>
                                                <TableCell> {<StatusBadge status={status}  qty={item.quantity}/> }</TableCell>
                                                <TableCell> 
                                                    <EditButton setProduct={setProduct} product={item} />
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }


                        
                        </TableBody>
                    </Table>
                </div>

                <div className="w-[35%] ms-5 h-[600px] shadow-md rounded-md overflow-auto" >
                    <PriorityTab />
                </div>

            </div>

            
           
        </div>
    )
  }


  
  export  function StatusBadge ( { status, qty } : { status : string, qty : number } ) {
      let display
      switch(status)
      {
          case "Reorder req'd":
              display = "bg-red-500 text-white font-bold shadow-lg"
          break;
  
          case "Sufficient":
              display = "bg-blue-500 text-white font-bold shadow-lg"
          break;
  
          case "Reorder":
              display = "bg-red-500 text-white font-bold shadow-lg"
          break;
      }
  
  
  
      return <Badge className={display} >{qty}</Badge>
  
  }