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
import { sampleStandardDeviation, classifyDemand } from "@/app/utils/customFunction"
import { getProductItemSold } from "@/app/utils/customFunction"
import { getTransactionInterface } from "@/app/types/transaction.type"

export default function SupplierTab() {

    const [product, setProduct] = useState<getProductInterface[]>([])
    const [transaction, setTransaction] = useState<getTransactionInterface[]>([])

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


    const { data : transactionData} = useQuery({
        queryKey : ["transaction"],
        queryFn : () => axios.get(backendUrl("transaction"))
    })

    useEffect(() => {
        if(transactionData?.data)
        {
            setTransaction(transactionData?.data)
        }
    }, [transactionData])

    return (
        <div className=" w-full h-dvh overflow-auto"> 

            <Navbar />

          
            <div className="m-auto w-5/6 h-[600px] shadow-md rounded-md ">
                <Table>
                   
                    <TableHeader>
                        <TableRow>
                            <TableHead>name of medecine</TableHead>
                            <TableHead>2022</TableHead>
                            <TableHead>2023</TableHead>
                            <TableHead>2024</TableHead>
                            <TableHead>2025</TableHead>
                            <TableHead>average demand</TableHead>
                            <TableHead>demand variability</TableHead>
                            <TableHead>Edit</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                         
                        {
                                product.map((item : getProductInterface, index : number) => {
                                    const averageDemand = (item.year2022 + item.year2023 + item.year2024) / 3
                                    const stdev = sampleStandardDeviation(item.year2022 , item.year2023 , item.year2024)
                                    const cv = stdev / averageDemand
                                    const demandVariability = classifyDemand(cv)
                                      
                                    const year2025 = getProductItemSold(item.productName, transaction)
                            
                                    
                                    return(
                                        <TableRow key={index}>
                                            <TableCell> {item.productName }</TableCell>
                                            <TableCell> {item.year2022}</TableCell>
                                            <TableCell> {item.year2023}</TableCell>
                                            <TableCell> {item.year2024}</TableCell>
                                            <TableCell> {year2025}</TableCell>
                                            <TableCell> {averageDemand.toFixed(0)}</TableCell>
                                            <TableCell> {demandVariability}</TableCell>
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

           
        </div>
    )
  }
