import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CropsResponse } from '../../interfaces/Crop/CropsResponse.interface';
import { CreateCrop } from '../../interfaces/Crop/CreateCrop.interface';
import { Crop } from '../../interfaces/Crop/Crop.interface';
import { UpdateCrop } from '../../interfaces/Crop/UpdateCrop.interface';
import { CreateCropDataRequest } from '../../interfaces/CropData/CreateCropData.interface';
import { CropData } from '../../interfaces/CropData/CropData.interface';
import { CropDataPage } from '../../interfaces/Plantation/FullPlantation.interface';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private httpClient: HttpClient) { }

  getAllCrops() {
    return this.httpClient.get<CropsResponse>(`${environment.API_URL}/crop/get-all-crops`)
  }

  getCropsByName(name: string) {

    const params = new HttpParams()
      .set('name', name)

    return this.httpClient.get<CropsResponse>(`${environment.API_URL}/crop/get-crop-by-name`,{params})
  }

  getAllCropsByPlantationId(plantationId: number, page: number) {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', '10')

    return this.httpClient.get<CropDataPage>(`${environment.API_URL}/crop/plantation/${plantationId}/get-all-crop-data`,{params});
  }

  createCrop(cropData: CreateCrop) {
    const formData = new FormData();

    if(cropData.file)
      formData.append('file', cropData.file);

    formData.append('crop', new Blob([JSON.stringify(cropData.crop)], { type: 'application/json' }));

    return this.httpClient.post<Crop>(`${environment.API_URL}/crop/create-crop`, formData);
  }

  createCropData(cropDataRequest: CreateCropDataRequest) {
    return this.httpClient.post<CropData>(`${environment.API_URL}/crop/${cropDataRequest.cropId}/add-data/plantation/${cropDataRequest.plantationId}`,cropDataRequest.cropData);
  }

  updateCrop(cropData: UpdateCrop) {

    const formData = new FormData();

    if(cropData.cropImage)
      formData.append('file', cropData.cropImage);

    formData.append('cropRequestDTO', new Blob([JSON.stringify(cropData.crop)], { type: 'application/json' }));


    return this.httpClient.put<Crop>(`${environment.API_URL}/crop/update-crop`, formData);
  }

  deleteCrop(idCrop: number) {
    return this.httpClient.delete<void>(`${environment.API_URL}/crop/delete-crop/${idCrop}`);
  }
}
