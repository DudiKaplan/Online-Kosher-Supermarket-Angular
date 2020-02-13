import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { OrdersService } from 'src/app/services/orders.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/cart.model';
import { ItemCart } from 'src/app/models/item-cart.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user: User;
  public productsCount: number;
  public ordersCount: number;
  public allCartsUser: Cart[];
  public openCart: Cart;
  public closeCart: Cart;
  public firstShop: string;
  public itemsCart:ItemCart[];
  public totalPrice:number;

  constructor(private redux: NgRedux<AppState>,
    private router: Router,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private cartsService: CartService) { }

  ngOnInit() {
    this.redux.subscribe(() => {
      this.user = this.redux.getState().user;
      if (this.redux.getState().user.isUser) {
        this.cartsService.getCartsByUserId()
          .subscribe(carts => {
            this.allCartsUser = carts
            this.checkCarts();
          }, err => alert(err));
      }
    })

    if (this.redux.getState().user.isUser) {
      this.cartsService.getCartsByUserId()
        .subscribe(carts => {
          this.allCartsUser = carts
          this.checkCarts();
        }, err => alert(err));
    }

    //get counts
    this.productsService.getProductsCount().subscribe((count) => { this.productsCount = count }, err => alert(err));
    this.ordersService.getOrdersCount().subscribe((count) => { this.ordersCount = count }, err => alert(err));

    //user
    this.user = this.redux.getState().user;
  };

  public checkCarts(): void {
    if (this.allCartsUser.length === 0) {
      this.firstShop = "Welcome to your first purchase";
      return;
    };
    const reverseCarts = this.allCartsUser.reverse();
    const openCarts = [];
    const closeCarts = [];
    for (const cart of reverseCarts) {
      if (cart.isOrder == false) {
        openCarts.push(cart);
      } else {
        closeCarts.push(cart);
      }
    }

    if(openCarts.length > 0){
      this.openCart = openCarts[0];
      this.getItemsCartPerCart(openCarts[0]._id)
      return;
    }
    if(closeCarts.length > 0){
      this.closeCart = closeCarts[0];
    }

  };

  public getItemsCartPerCart(_id:string):void{
    this.cartsService.getItemsCartPerCart(_id)
      .subscribe(items => {
        this.itemsCart = items;
        this.totalPrice = items.map(t => t.generalPrice).reduce((acc, value) => acc + value, 0);
      },err => alert(err));
  }

  public resumeShopping():void{
    this.cartsService.resumeShopping(this.openCart,this.itemsCart);
    this.router.navigate(["/shop"]);

  }


}
