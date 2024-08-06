import { Plantation } from "./Plantation.interface";

export interface PlantationResponse {
  content: Plantation[],
  totalPages: number,
  number: number
}
