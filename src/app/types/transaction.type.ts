
export interface transactionInterface {
    date : string,
    customer: string,
    productName: string,
    price: number,
    quantity: number,
    totalPrice: number,
    cashier: string   
}

export interface getTransactionInterface extends transactionInterface {
    _id : string
} 