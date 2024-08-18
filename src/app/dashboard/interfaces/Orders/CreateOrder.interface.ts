export interface CreateOrder {
  orderDate: string,
  deliveryDate: string,
  paid: boolean,
  delivered: boolean,
  customerId: number,
  products: CropDataOrder[]
}

export interface CropDataOrder {
  cropDataId: number,
  kilos: number
}
