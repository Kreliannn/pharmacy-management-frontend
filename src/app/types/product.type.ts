
export interface productInterface {
    productName : string,
    description: string,
    type: string,
    price: number,
    quantity: number,
    category : string,
    cost : number,
    holdingCost: number,
    caryingCost: number,
    status: string,
    reorderPoint : number,
    safetyStock : number,
    orderQuantity : number,
    year2022 : number,
    year2023 : number,
    year2024 : number,
}

export interface getProductInterface extends productInterface {
  _id : string
} 
   