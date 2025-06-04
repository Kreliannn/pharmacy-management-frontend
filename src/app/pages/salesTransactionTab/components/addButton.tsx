"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { backendUrl } from "@/app/utils/url"
import { supplierInterface , getSupplierInterface} from "@/app/types/supplier.type"
import { successAlert , errorAlert} from "@/app/utils/alert"
import { getProductInterface } from "@/app/types/product.type"
import { useQuery } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query";
import { getTransactionInterface, transactionInterface } from "@/app/types/transaction.type"
import { error } from "console"


export function AddButton({ setTransaction } : { setTransaction : React.Dispatch<React.SetStateAction<getTransactionInterface[]>> }) {
  const [ProductName, setProductName] = useState("")
  const [quantity, setQuantity] = useState("")
  const today = new Date().toISOString().split("T")[0]
  const [customer, setCustomer] = useState("")
  const [cashier, setCashier] = useState("")
  const [price, setPrice] = useState(0)
  const [totalPice, setTotalPrice] = useState(0)


  const queryClient = useQueryClient();

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

    const clearFormFields = () => {
        setCashier("")
        setCustomer("")
        setProductName("")
        setPrice(0)
        setQuantity("")
    };
    



  const mutation = useMutation({
    mutationFn : (data : transactionInterface ) => axios.post(backendUrl("transaction"), { transaction : data}),
    onSuccess : (res : { data : getTransactionInterface[]}) => {
      successAlert("data created")
      setTransaction(res.data)
      clearFormFields()
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError : (err) => {
      errorAlert("error")
    }
  })

  const handleSave = () => {
        if(!ProductName) return errorAlert("empty field")

        const newTransaction : transactionInterface = {
            date : today,
            productName : ProductName,
            price : price,
            quantity : Number(quantity),
            totalPrice : (Number(quantity) * price),
            cashier : cashier,
            customer : customer
        }
      
        mutation.mutate(newTransaction)
  }

  const handleSelectChange = (selected : string) => {
    if(selected == "none")
    {
      clearFormFields()
      return
    }

    product.map((item) => {
      if(selected == item.productName)
      {
        setPrice(item.price)
        setProductName(item.productName)
      }
    })
    
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button > Add </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Product</SheetTitle>
          <SheetDescription>Input product information</SheetDescription>
        </SheetHeader>

        <div className="h-[500px] w-5/6 m-auto overflow-auto p-3 space-y-3 text-sm text-gray-700">
          {/* Select Existing Product */}
          <div>
            <label className="block mb-1">Select Existing Product</label>
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Existing Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Existing Product</SelectLabel>
                  <SelectItem value={"none"}>  none  </SelectItem>
                  {
                    product.filter(item => item.quantity > 0 && item.price !== 0).map((item : getProductInterface) => (
                      <SelectItem value={item.productName} key={item.productName}> {item.productName} </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


          <div>
            <label className="block mb-1">Product Quantity</label>
            <Input
              className="w-full"
              placeholder="Product Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Customer</label>
            <Input
              type="text"
              className="w-full"
              value={customer}
              placeholder="customer"
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1"> Cashier </label>
            <Input
              type="text"
              className="w-full"
              placeholder="cashier"
              value={cashier}
              onChange={(e) => setCashier(e.target.value)}
            />
          </div>

          
        </div>

        <SheetFooter>
          <Button type="button" onClick={handleSave}>
            Submit
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
