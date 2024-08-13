import { CropDataRequest } from "./CreateCropData.interface"
import { CropData } from "./CropData.interface"

export interface UpdateCropData {
  cropDataId: number
  cropId: number,
  cropData: CropDataRequest
}
