import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/app-state';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAction } from '../redux/action';
import { ActionType } from '../redux/action-type';
import { ItemCart } from '../models/item-cart.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  public url = environment.localUrl;
  public cart: Cart;
  public itemsCart: ItemCart[];

  constructor(private httpClient: HttpClient, private redux: NgRedux<AppState>) { }

  public createCart(): void {
    const newCart = new Cart();
    const date = new Date();
    newCart.user = this.redux.getState().user._id;
    newCart.creationDate = date.getTime();

    //save to redux
    this.httpClient
      .post<Cart>(this.url + "/carts", newCart)
      .subscribe(products => {
        const action: IAction = {
          type: ActionType.GetCart,
          payload: products
        };
        this.redux.dispatch(action);
      });
  };

  public addItemCart(newItem: ItemCart): void {
    const thisProduct = this.redux.getState().products.find(p => p._id === newItem.product);
    newItem.cart = this.redux.getState().cart._id;
    newItem.generalPrice = thisProduct.price * newItem.amount;

    //save to redux
    this.httpClient
      .post<ItemCart>(this.url + "/carts/item-cart", newItem)
      .subscribe(item => {
        item.imageName = thisProduct.imageName;
        item.productName = thisProduct.name;
        const action: IAction = {
          type: ActionType.AddItemCart,
          payload: item
        };
        this.redux.dispatch(action);
      });
  };

  public deleteItemCart(_id: string): void {
    this.httpClient.delete<null>(this.url + "/carts/item-cart/" + _id)
      .subscribe(() => {
        const action: IAction = {
          type: ActionType.DeleteOneItemCart,
          payload: _id
        };
        this.redux.dispatch(action);
      }, err => alert(err));;
  }

  public deleteAllItemCart(): void {
    this.httpClient.delete<null>(this.url + "/carts/items-cart/" +
      this.redux.getState().cart._id).subscribe(() => {
        const action: IAction = {
          type: ActionType.DeleteAllItemsCart,
          payload: []
        };
        this.redux.dispatch(action);
      }, err => alert(err));
  };

  public getCartsByUserId(): Observable<Cart[]> {
    return this.httpClient.get<Cart[]>(this.url + "/carts/by-user/" + this.redux.getState().user._id);
  };

  public getItemsCartPerCart(_id: string): Observable<ItemCart[]> {
    return this.httpClient.get<ItemCart[]>(this.url + "/carts/by-cart/" + _id)
  };

  public resumeShopping(cart: Cart, itemsCart: ItemCart[]): void {
    ////update redux
    const action: IAction = {
      type: ActionType.ResumeShopping,
      payload: {
        cart: cart,
        itemsCart: itemsCart
      }
    };
    this.redux.dispatch(action);
  };
  
}
