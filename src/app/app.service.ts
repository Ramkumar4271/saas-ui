import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as props from './backend-config';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  selectedService: any = {};
  orders: any = [];
  isServiceAdded = false;

  constructor(private http: HttpClient) {     
  }

  getServices() {
    return this.http.get<any>(props.URL + '/services/');
  }

  getPricing() {
    return this.http.get<any>(props.URL + '/pricing/');
  }

  createOrder(order: any) {
    return this.http.post<any>(props.URL + '/orders/new-order', order);
  }

  getOrders() {
    return this.http.get<any>(props.URL + '/orders/');
  }

  deleteOrder(id: any) {
    return this.http.delete<any>(props.URL + `/orders/${id}`);
  }

  placeOrders(orders: any) {
    return this.http.post<any>(props.URL + '/orders/place-orders', orders);
  }
}
