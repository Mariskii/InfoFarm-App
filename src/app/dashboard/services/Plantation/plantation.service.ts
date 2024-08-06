import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PlantationResponse } from '../../interfaces/Plantation/PlantationsResponse.interface';
import { Plantation } from '../../interfaces/Plantation/Plantation.interface';
import { PlantationRequest } from '../../interfaces/Plantation/PlantationRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantationService {

  constructor(private httpClient: HttpClient) { }

  getAllPlantations() {
    return this.httpClient.get<PlantationResponse>(`${environment.API_URL}/plantation/get-all-plantations`)
  }

  createPlantation(plantation: PlantationRequest) {
    return this.httpClient.post<Plantation>(`${environment.API_URL}/plantation/add-plantation/bussines/1`, plantation);
  }
}
