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


export function EditButton({ setProduct , setValue } : { setValue : (c : number, h : number) => void, setProduct : React.Dispatch<React.SetStateAction<getProductInterface[]>> }) {
  
  const [carryingCost, setCarryingCost] = useState("")
  const [holdingCost, setHoldingCost] = useState("")
  


    const clearFormFields = () => {
    
    };
    
    {/* 
       const mutation = useMutation({
    mutationFn : (data : { carryingCost : number, HoldingCost : number, year2024 : number, _id : string} ) => axios.patch(backendUrl("product/demandPage"), { product : data}),
    onSuccess : (res : { data : getProductInterface[]}) => {
      successAlert("data updated")
      setProduct(res.data)
      clearFormFields()
    },
    onError : (err) => {
      errorAlert("error")
    }
  })
      
      */}
 

  const handleSave = () => {
    if(!carryingCost || !holdingCost) return errorAlert("empty field")
    setValue(Number(carryingCost), Number(holdingCost))
    successAlert("updated")
  }


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit  information</SheetTitle>
          <SheetDescription>Input product information</SheetDescription>
        </SheetHeader>

        <div className="h-[500px] w-5/6 m-auto overflow-auto p-3 space-y-3 text-sm text-gray-700">
       

          <div>
            <label className="block mb-1">Carrying Cost</label>
            <Input
              
              className="w-full"
              placeholder="Carrying Cost"
              value={carryingCost}
              onChange={(e) => setCarryingCost(e.target.value)}
            />
          </div>

       
          <div>
            <label className="block mb-1">year 2023</label>
            <Input
              
              className="w-full"
              placeholder="year 2023"
              value={holdingCost}
              onChange={(e) => setHoldingCost(e.target.value)}
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