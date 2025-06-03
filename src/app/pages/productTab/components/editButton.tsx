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


export function EditButton({ setProduct, product } : { product : getProductInterface, setProduct : React.Dispatch<React.SetStateAction<getProductInterface[]>> }) {
  
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")



    const clearFormFields = () => {
        setPrice("");
        setCategory("");
    };
    

  const mutation = useMutation({
    mutationFn : (data : { price : number, category : string, _id : string} ) => axios.patch(backendUrl("product/productPage"), { product : data}),
    onSuccess : (res : { data : getProductInterface[]}) => {
      successAlert("data updated")
      setProduct(res.data)
      clearFormFields()
    },
    onError : (err) => {
      errorAlert("error")
    }
  })

  const handleSave = () => {
    const data = {
        _id : product._id,
        price : Number(price),
        category : category
    }

    mutation.mutate(data)
  }


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit {product.productName} information</SheetTitle>
          <SheetDescription>Input product information</SheetDescription>
        </SheetHeader>

        <div className="h-[500px] w-5/6 m-auto overflow-auto p-3 space-y-3 text-sm text-gray-700">
       

          <div>
            <label className="block mb-1">Product Price</label>
            <Input
              
              className="w-full"
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

       
          <div>
            <label className="block mb-1">Product Category</label>
            <Input
              className="w-full"
              placeholder="Product Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          
        </div>

        <SheetFooter>
          <Button type="button" onClick={handleSave}>
            Update Product
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
