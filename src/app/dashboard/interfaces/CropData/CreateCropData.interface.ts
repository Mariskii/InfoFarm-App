export interface CreateCropDataRequest {
  plantationId?: number,
  cropId: number,
  cropData: CropDataRequest
}

export interface CropDataRequest {
  kilos: number,
  kilo_price: number,
  cost: number,
  planting_date?: string,
  collection_date?: string,
  surface: number,
  type_surface: string,
}
