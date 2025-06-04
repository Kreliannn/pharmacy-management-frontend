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
import { sampleStandardDeviation, classifyDemand, calculateSafetyStock } from "@/app/utils/customFunction"
import { Badge } from "@/components/ui/badge";

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
                                    product.filter((item) => ["AE", "AN", "AV", "BV", "CV"].includes(item.type) ).map((item : getProductInterface, index : number) =>{
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

                                       
                                        return (
                                            <TableRow key={index}>
                                                <TableCell> {item.productName }</TableCell>
                                                <TableCell> {item.type}</TableCell>
                                                <TableCell> {item.price}</TableCell>
                                                <TableCell> {<StatusBadge status={status}  qty={item.quantity}/> }</TableCell>
                                            </TableRow>
                                        )

                                    })
                                }


                        
                        </TableBody>
                    </Table>
               
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
              display = "bg-orange-500 text-white font-bold shadow-lg"
          break;
      }
  
  
  
      return <Badge className={display} >{qty}</Badge>
  
  } 