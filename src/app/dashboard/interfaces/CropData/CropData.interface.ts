import { ReducedCrop } from "./ReducedCrop.interface";

export interface CropData {
  id: number,
  plantating_date: Date,
  collection_date: Date,
  kilo_price: number,
  cost: number,
  kilos:number,
  type_surface: string,
  kilos_surface: number,
  surface: number,
  crop: ReducedCrop,
}
