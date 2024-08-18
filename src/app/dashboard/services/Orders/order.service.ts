import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrder } from '../../interfaces/Orders/CreateOrder.interface';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  createOrder(order: CreateOrder) {
    return this.httpClient.post(`${environment.API_URL}/order/create-order`, order);
  }
}
