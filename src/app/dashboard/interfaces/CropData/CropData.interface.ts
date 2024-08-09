import { ReducedCrop } from "./ReducedCrop.interface";

export interface CropData {
  id: number,
  plantating_date: Date,
  collection_date: Date,
  kilo_price: number,
  cost: number,
  kilos:number,
  crop: ReducedCrop
  //TODO: Implementar needs
}
