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

export default function SupplierTab() {

    const [product, setProduct] = useState<getProductInterface[]>([])

    const [search, setSearch] = useState("")

    const handleSearch = () => {
        if(!search) return errorAlert("empty field")
        setProduct((prev) => prev.filter((item : getProductInterface) => item.productName == search ))
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

          

            <div className="w-full flex">
                <div className="ms-5 w-[60%] h-[600px] shadow-md rounded-md overflow-auto">
                <div className=" w-full h-[70px]  rounded-md flex gap-5 mb-5 items-center">

                    <div className="flex w-[250px] gap-2 ms-5">
                        <Input type={"text"} value={search} placeholder="enter medecine name" onChange={(e) => {
                            const value = e.target.value
                            setSearch(value)
                            if(value == "") setProduct(data?.data)
                        }}/>
                        <Button onClick={handleSearch}> Search </Button>
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
                                <TableHead>quantity</TableHead>
                                <TableHead>Edit</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            
                            {
                                    product.map((item : getProductInterface, index : number) => (
                                        <TableRow key={index}>
                                            <TableCell> {item.productName }</TableCell>
                                            <TableCell className="max-w-[50px] overflow-hidden">  {item.description}</TableCell>
                                            <TableCell> {item.type}</TableCell>
                                            <TableCell> {item.category}</TableCell>
                                            
                                            <TableCell>  <span className="text-green-500"> ₱{item.price} </span></TableCell>
                                            <TableCell> {item.quantity}</TableCell>
                                            <TableCell> 
                                                <EditButton setProduct={setProduct} product={item} />
                                            </TableCell>
                                        </TableRow>
                                    ))
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
