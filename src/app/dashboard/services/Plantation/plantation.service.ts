import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PlantationResponse } from '../../interfaces/Plantation/PlantationsResponse.interface';
import { Plantation } from '../../interfaces/Plantation/Plantation.interface';
import { PlantationRequest } from '../../interfaces/Plantation/PlantationRequest.interface';
import { FullPlantation } from '../../interfaces/Plantation/FullPlantation.interface';

@Injectable({
  providedIn: 'root'
})
export class PlantationService {

  constructor(private httpClient: HttpClient) { }

  getAllPlantations() {
    return this.httpClient.get<PlantationResponse>(`${environment.API_URL}/plantation/get-all-plantations`);
  }

  getPlantationById(idPlantation: number) {
    return this.httpClient.get<FullPlantation>(`${environment.API_URL}/plantation/get-plantation/${idPlantation}`);
  }

  createPlantation(plantation: PlantationRequest) {
    return this.httpClient.post<Plantation>(`${environment.API_URL}/plantation/add-plantation/bussines/1`, plantation);
  }

  deletePlantation(plantationId: number) {
    return this.httpClient.delete<void>(`${environment.API_URL}/plantation/delete-plantation/${plantationId}`);
  }

  updatePlantation(plantation:Plantation) {
    return this.httpClient.put<Plantation>(`${environment.API_URL}/plantation/edit-plantation`,plantation);
  }
}
