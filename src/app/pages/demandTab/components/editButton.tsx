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
  
  const [year2022, setYear2022] = useState("")
  const [year2023, setYear2023] = useState("")
  const [year2024, setYear2024] = useState("")



    const clearFormFields = () => {
        setYear2022("");
        setYear2023("");
        setYear2024("");
    };
    

  const mutation = useMutation({
    mutationFn : (data : { year2022 : number, year2023 : number, year2024 : number, _id : string} ) => axios.patch(backendUrl("product/demandPage"), { product : data}),
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
        year2022 : Number(year2022),
        year2023 : Number(year2023),
        year2024 : Number(year2024)
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
            <label className="block mb-1">year 2022</label>
            <Input
              
              className="w-full"
              placeholder="year 2022"
              value={year2022}
              onChange={(e) => setYear2022(e.target.value)}
            />
          </div>

       
          <div>
            <label className="block mb-1">year 2023</label>
            <Input
              
              className="w-full"
              placeholder="year 2023"
              value={year2023}
              onChange={(e) => setYear2023(e.target.value)}
            />
          </div>


          <div>
            <label className="block mb-1">year 2024</label>
            <Input
              
              className="w-full"
              placeholder="year 2024"
              value={year2024}
              onChange={(e) => setYear2024(e.target.value)}
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
