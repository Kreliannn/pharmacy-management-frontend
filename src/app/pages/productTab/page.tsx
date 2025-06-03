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


export default function SupplierTab() {
    return (
        <div className=" w-full h-dvh overflow-auto"> 

            <Navbar />

            <div className="m-auto w-5/6 h-[70px] shadow-md rounded-md flex gap-5 mb-5 items-center">
               
            </div>

            <div className="m-auto w-5/6 h-[600px] shadow-md rounded-md ">
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>name</TableHead>
                            <TableHead>description</TableHead>
                            <TableHead>type</TableHead>
                            <TableHead>category</TableHead>
                            <TableHead>cost</TableHead>
                            <TableHead>price</TableHead>
                            <TableHead>quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            



                        </TableRow>
                    </TableBody>
                </Table>
            </div>

           
        </div>
    )
  }
