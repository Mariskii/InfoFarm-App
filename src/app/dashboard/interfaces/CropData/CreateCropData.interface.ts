export interface CreateCropDataRequest {
  plantationId?: number,
  cropId: number,
  cropData: CreateCropData
}

export interface CreateCropData {
  kilos: number,
  kiloPrice: number,
  cost: number,
  planting_date?: Date,
  collection_date?: Date
}
