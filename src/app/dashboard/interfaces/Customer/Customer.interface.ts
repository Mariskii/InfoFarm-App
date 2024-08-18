export interface Customer {
  id: number,
  costumerName: string,
  costumerEmail: string,
  costumerPhone: string,
  costumerAddress: string
  costumerCity: string,
  costumerPostalCode: string,
}

export interface CustomerReduced {
  id: number,
  costumerName: string,
}
