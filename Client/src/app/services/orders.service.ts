import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Observable } from 'rxjs';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/app-state';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  public url = environment.localUrl;

  constructor(private httpClient: HttpClient, protected redux: NgRedux<AppState>) { }

  public addOrder(order: Order): Observable<Order> {
    order.cart = this.redux.getState().cart._id;
    order.user = this.redux.getState().user._id;
    return this.httpClient.post<Order>(this.url + "/orders", order)
  };

  //update cart the order is close
  public updateCartStatus(): void {
    const _id = this.redux.getState().cart._id;
    this.httpClient.patch<undefined>(this.url + "/carts/" + _id, _id)
      .subscribe(() => { }, err => alert(err));
  };

  public getOrdersCount(): Observable<number> {
    return this.httpClient.get<number>(this.url + "/orders/count")
  };

}
