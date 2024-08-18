export interface CreateCropDataRequest {
  plantationId?: number,
  cropId: number,
  cropData: CropDataRequest
}

export interface CropDataRequest {
  kilos: number,
  kilo_price: number,
  cost: number,
  planting_date?: Date,
  collection_date?: Date
  surface: number,
  type_surface: string,
}
