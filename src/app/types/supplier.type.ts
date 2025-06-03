export interface supplierInterface {
    ProductName: string;
    description: string;
    type : string,
    cost: number,
    quantity: number,
    totalCost: number,
    orderedDate: string
    orderedReceived: string,
    expirydDate: string,
    supplierName: string,
    receivedBy: string,
}

export interface getSupplierInterface extends supplierInterface {
    _id : string
}