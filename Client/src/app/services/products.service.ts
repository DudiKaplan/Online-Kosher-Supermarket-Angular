import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/app-state';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { IAction } from '../redux/action';
import { ActionType } from '../redux/action-type';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private httpClient: HttpClient, private redux: NgRedux<AppState>) { }

  public url = environment.localUrl;

  public addProductAsync(product: Product, file: File): void {
    const formData = new FormData();
    formData.append("selection", file);
    formData.append("json", JSON.stringify(product));
    this.httpClient.post<Product>(this.url + "/products", formData)
      //update redux
      .subscribe((product) => {
        const action: IAction = {
          type: ActionType.AddProduct,
          payload: product
        };
        this.redux.dispatch(action);
      },
        err => alert(err.error));;
  };

  public updateProductAsync(product: Product, file: File): void {
    const formData = new FormData();
    formData.append("selection", file);
    formData.append("json", JSON.stringify(product));
    this.httpClient.patch<Product>(this.url + "/products/" + product._id, formData)
      //update redux
      .subscribe((product => {
        const action: IAction = {
          type: ActionType.UpdateProduct,
          payload: product
        };
        this.redux.dispatch(action);
      }), err => alert(err))
  };

  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + "/products/categories")
  };

  //for click category to get products 
  public getProductsPerCategory(_id: string): void {
    this.httpClient
      .get<Product[]>(this.url + "/products/per-category/" + _id)
      .subscribe(products => {
        //update redux
        const action: IAction = {
          type: ActionType.GetProducts,
          payload: products
        };
        this.redux.dispatch(action);
      }, err => alert(err));
  };

  //for sharch
  public getProductByName(keyword: string): void {
    if (keyword === "") {
      const action: IAction = {
        type: ActionType.GetProducts,
        payload: []
      };
      this.redux.dispatch(action);
    } else {
      this.httpClient
        .get<Product[]>(this.url + "/products/product-by-name/" + keyword)
        .subscribe(products => {
          //update redux
          const action: IAction = {
            type: ActionType.GetProducts,
            payload: products
          };
          this.redux.dispatch(action);
        }, err => alert(err));
    }
  };

  public getProductsCount(): Observable<number> {
    return this.httpClient.get<number>(this.url + "/products/count")
  };

};

