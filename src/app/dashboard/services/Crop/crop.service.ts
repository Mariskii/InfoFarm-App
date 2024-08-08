import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CropsResponse } from '../../interfaces/Crop/CropsResponse.interface';
import { CreateCrop } from '../../interfaces/Crop/CreateCrop.interface';
import { Crop } from '../../interfaces/Crop/Crop.interface';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private httpClient: HttpClient) { }

  getAllCrops() {
    return this.httpClient.get<CropsResponse>(`${environment.API_URL}/crop/get-all-crops`)
  }

  createCrop(cropData: CreateCrop) {
    const formData = new FormData();

    if(cropData.file)
      formData.append('file', cropData.file);

    formData.append('crop', new Blob([JSON.stringify(cropData.crop)], { type: 'application/json' }));

    return this.httpClient.post<Crop>(`${environment.API_URL}/crop/create-crop`, formData);
  }
}
