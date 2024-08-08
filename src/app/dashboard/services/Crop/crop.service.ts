import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CropsResponse } from '../../interfaces/Crop/CropsResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CropService {

  constructor(private httpClient: HttpClient) { }

  getAllCrops() {
    return this.httpClient.get<CropsResponse>(`${environment.API_URL}/crop/get-all-crops`)
  }
}
