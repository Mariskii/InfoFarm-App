import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CustomerReducedResponse } from '../../interfaces/Customer/CustomerResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient: HttpClient) { }

  getCustomerByName(name: string, page?: number, size?: number) {
    let params = new HttpParams()
      .set('name', name)

      if(page)
        params.set('page', page.toString())

      if(size)
        params.set('size', size.toString());

      //TODO: Modificar respuesta y crear CustomerResponse
    return this.httpClient.get<CustomerReducedResponse>(`${environment.API_URL}/costumer/get-by-name`, { params });
  }

  getCustomerReducedByName(name: string, page?: number, size?: number) {
    let params = new HttpParams()
      .set('name', name)

      if(page)
        params.set('page', page.toString())

      if(size)
        params.set('size', size.toString());

    return this.httpClient.get<CustomerReducedResponse>(`${environment.API_URL}/costumer/get-reduced-by-name`, { params });
  }
}
