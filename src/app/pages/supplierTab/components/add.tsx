import { useState } from "react"
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
import { supplierInterface } from "@/app/types/supplier.type"
import { successAlert , errorAlert} from "@/app/utils/alert"




export function AddButton() {
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


  const mutation = useMutation({
    mutationFn : (data : supplierInterface ) => axios.post(backendUrl("supplier"), { supplier : data}),
    onSuccess : (res) => {
      successAlert(res.data)
    },
    onError : (err) => {
      errorAlert("error")
    }
  })

  const handleSave = () => {
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
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
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Existing Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Existing Product</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
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
            Save changes
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
