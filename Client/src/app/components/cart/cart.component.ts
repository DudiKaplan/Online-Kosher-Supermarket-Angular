import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ItemCart } from 'src/app/models/item-cart.model';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cart: Cart;
  public itemCart: ItemCart[];
  public url = environment.localImages;
  public user: User;
  public product: Product;
  public showAddProduct:Boolean = false;

  constructor(private redux: NgRedux<AppState>,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    const reduxState = this.redux.getState();
    this.redux.subscribe(() => {
      this.cart = this.redux.getState().cart;
      this.itemCart = this.redux.getState().itemsCart;
      this.product = this.redux.getState().product;

    });
    this.cart = reduxState.cart;
    this.itemCart = reduxState.itemsCart;
    this.user = reduxState.user;
    this.product = reduxState.product;

  }

  public backToHomePage(): void {
    this.router.navigate(["/home"]);
  };

  public deleteItemCart(_id): void {
    this.cartService.deleteItemCart(_id);
  };

  public deleteAllItemCart(): void {
    this.cartService.deleteAllItemCart();
  };

  public closeAddProduct():void{
    this.showAddProduct = false;
  };

  public goToOrder():void{
    this.router.navigate(["/order"]);
  }

  public getTotalPrice() {
    return this.itemCart.map(t => t.generalPrice).reduce((acc, value) => acc + value, 0);
  };


}
