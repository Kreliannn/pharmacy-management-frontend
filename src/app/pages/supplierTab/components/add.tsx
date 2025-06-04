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


export function AddButton({ setSupplier } : { setSupplier : React.Dispatch<React.SetStateAction<getSupplierInterface[]>> }) {
  const [ProductName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("")
  const [cost, setCost] = useState("")
  const [quantity, setQuantity] = useState("")
  const [orderedDate, setOrderedDate] = useState("")
  const [orderedReceived, setOrderedReceived] = useState(new Date().toISOString().split("T")[0])
  const [expirydDate, setExpirydDate] = useState("")
  const [supplierName, setSupplierName] = useState("")
  const [receivedBy, setReceivedBy] = useState("")

  const [disable, setDisable] = useState(false)

  const [product, setProduct] = useState<getProductInterface[]>([])

  const queryClient = useQueryClient();


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
      setProductName("");
      setDescription("");
      setType("");
      setCost("");
      setQuantity("");
      setOrderedDate("");
      setOrderedReceived(new Date().toISOString().split("T")[0]);
      setExpirydDate("");
      setSupplierName("");
      setReceivedBy("");
    };
    



  const mutation = useMutation({
    mutationFn : (data : supplierInterface ) => axios.post(backendUrl("supplier"), { supplier : data}),
    onSuccess : (res : { data : getSupplierInterface[]}) => {
      successAlert("data created")
      setSupplier(res.data)
      queryClient.invalidateQueries({ queryKey: ["product"] });
      clearFormFields()
    },
    onError : (err) => {
      errorAlert("error")
    }
  })

  const handleSave = () => {
    if (
      ProductName.trim() === "" ||
      description.trim() === "" ||
      type.trim() === "" ||
      cost.trim() === "" ||
      quantity.trim() === "" ||
      orderedDate.trim() === "" ||
      orderedReceived.trim() === "" ||
      expirydDate.trim() === "" ||
      supplierName.trim() === "" ||
      receivedBy.trim() === ""
    ) {
      errorAlert("Please fill in all required fields")
      return
    }
    const totalCost = Number(cost) * Number(quantity)
    const supplierData = {
      ProductName,
      description,
      type,
      cost: Number(cost),
      quantity: Number(quantity),
      totalCost,
      orderedDate,
      orderedReceived,
      expirydDate,
      supplierName,
      receivedBy,
    }

    mutation.mutate(supplierData)
  }

  const handleSelectChange = (selected : string) => {
    if(selected == "none")
    {
      setDisable(false)
      setDescription("")
      setProductName("")
      setCost("")
      setType("")
      return
    }

    product.map((item) => {
      if(selected == item.productName)
      {
        setDisable(true)
        setProductName(item.productName)
        setDescription(item.description)
        setCost(item.cost.toString())
        setType(item.type)
      }
    })
    
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button >New</Button>
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
                    product.map((item : getProductInterface) => (
                      <SelectItem value={item.productName} key={item.productName}> {item.productName} </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-1">Product Name</label>
            <Input
              
              className="w-full"
              placeholder="Product Name"
              value={ProductName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Product Description</label>
            <Textarea
              
              placeholder="Product Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Product Type</label>
            <Input
              className="w-full"
              placeholder="Product Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Product Cost</label>
            <Input
              className="w-full"
              placeholder="Product Cost"
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
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
            <label className="block mb-1">Ordered Date</label>
            <Input
              type="date"
              className="w-full"
              value={orderedDate}
              onChange={(e) => setOrderedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Order Received Date</label>
            <Input
              type="date"
              className="w-full"
              value={orderedReceived}
              onChange={(e) => setOrderedReceived(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Expiry Date</label>
            <Input
              type="date"
              className="w-full"
              value={expirydDate}
              onChange={(e) => setExpirydDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Supplier Name</label>
            <Input
              className="w-full"
              placeholder="Supplier Name"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1">Received By</label>
            <Input
              className="w-full"
              placeholder="Received By"
              value={receivedBy}
              onChange={(e) => setReceivedBy(e.target.value)}
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
