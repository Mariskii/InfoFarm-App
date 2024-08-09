import { CropData } from "../CropData/CropData.interface";

export interface FullPlantation {
  id:number,
  name: string,
  description: string,
  location: string,
  cropData: CropDataPage,
}

export interface CropDataPage {
  content: CropData[],
  totalElements: number
}
