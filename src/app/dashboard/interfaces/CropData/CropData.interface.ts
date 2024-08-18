import { ReducedCrop } from "./ReducedCrop.interface";

export interface CropData {
  id: number,
  planting_date: string,
  collection_date: string,
  kilo_price: number,
  cost: number,
  kilos:number,
  type_surface: string,
  kilos_surface: number,
  surface: number,
  crop: ReducedCrop,
}
