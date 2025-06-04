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
import { getTransactionInterface } from "@/app/types/transaction.type" 
import { backendUrl } from "@/app/utils/url" 
import axios from "axios" 
import PriorityTab from "@/components/ui/priorityTab" 
import { Input } from "@/components/ui/input" 
import { errorAlert } from "@/app/utils/alert" 
import { getProductItemSold } from "@/app/utils/customFunction" 
 
export default function SupplierTab() { 
 
    const [transaction, setTransaction] = useState<getTransactionInterface[]>([]) 
    const [totalSales, setTotalSales] = useState<number>(0)
    const [currentMonth, setCurrentMonth] = useState<string>("")
 
    const { data } = useQuery({ 
        queryKey : ["transaction"], 
        queryFn : () => axios.get(backendUrl("transaction")) 
    }) 
 
    useEffect(() => { 
        if(data?.data) {
            const currentDate = new Date()
            const currentYear = currentDate.getFullYear()
            const currentMonthNum = currentDate.getMonth()
            
            // Get month name
            const monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]
            setCurrentMonth(monthNames[currentMonthNum])
            
            // Filter transactions for current month and year
            const filteredTransactions = data.data.filter((item: getTransactionInterface) => {
                const transactionDate = new Date(item.date)
                return transactionDate.getMonth() === currentMonthNum && 
                       transactionDate.getFullYear() === currentYear
            })
            
            setTransaction(filteredTransactions)
            
            // Calculate total sales
            const total = filteredTransactions.reduce((sum: number, item: getTransactionInterface) => {
                return sum + (item.totalPrice || 0)
            }, 0)
            setTotalSales(total)
        } 
    }, [data]) 

    const handlePrint = () => {
        window.print()
    }
 
    return ( 
        <>
            <style jsx global>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    .print-only {
                        display: block !important;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                }
                .print-only {
                    display: none;
                }
            `}</style>
            
            <div className=" w-full h-dvh overflow-auto">  
                <div className="no-print">
                    <Navbar />
                </div>

                <div className="print-only text-center py-4">
                    <h1 className="text-2xl font-bold">Monthly Transaction Report</h1>
                    <h2 className="text-lg">{currentMonth} {new Date().getFullYear()}</h2>
                </div>

                <div className="no-print mb-4 w-5/6 m-auto text-end">
                    <Button onClick={handlePrint} className="mx-2">
                        Print Report
                    </Button>
                </div>
                
                <div className="m-auto w-5/6 overflow-auto h-[600px] shadow-md rounded-md print:h-auto print:overflow-visible print:shadow-none"> 
                    <div className="mb-4 p-4  rounded-md print:bg-white">
                        <h2 className="text-xl font-semibold mb-2">{currentMonth} {new Date().getFullYear()} Sales Report</h2>
                        <p className="text-lg">
                            <span className="font-medium">Total Sales: </span>
                            <span className="font-bold text-green-600">₱{totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </p>
                        <p className="text-sm text-gray-600">Total Transactions: {transaction.length}</p>
                    </div>

                    <Table> 
                        <TableHeader className=""> 
                            <TableRow> 
                                <TableHead>Date</TableHead> 
                                <TableHead>Customer</TableHead> 
                                <TableHead>Medicine</TableHead> 
                                <TableHead>Price</TableHead> 
                                <TableHead>Quantity Sold</TableHead> 
                                <TableHead>Total</TableHead> 
                                <TableHead>Released By</TableHead> 
                            </TableRow> 
                        </TableHeader> 
                        <TableBody> 
                            { 
                                transaction.length > 0 ? (
                                    transaction.map((item : getTransactionInterface, index : number) => ( 
                                        <TableRow key={index}> 
                                            <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell> 
                                            <TableCell>{item.customer}</TableCell> 
                                            <TableCell>{item.productName}</TableCell> 
                                            <TableCell>₱{item.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell> 
                                            <TableCell>{item.quantity}</TableCell> 
                                            <TableCell>₱{item.totalPrice?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell> 
                                            <TableCell>{item.cashier}</TableCell> 
                                        </TableRow> 
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                            No transactions found for {currentMonth} {new Date().getFullYear()}
                                        </TableCell>
                                    </TableRow>
                                )
                            } 
                        </TableBody> 
                    </Table> 
                </div> 
            </div>
        </>
    ) 
}