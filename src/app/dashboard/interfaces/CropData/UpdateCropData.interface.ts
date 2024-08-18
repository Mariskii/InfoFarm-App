import { CropDataRequest } from "./CreateCropData.interface"

export interface UpdateCropData {
  cropDataId: number
  cropId: number,
  cropData: CropDataRequest
}
