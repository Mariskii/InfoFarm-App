import { Crop } from "./Crop.interface";

export interface CropsResponse {
  content: Crop[],
  totalPages: number,
  number: number
}
