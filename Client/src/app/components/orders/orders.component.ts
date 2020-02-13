import { Component, OnInit, Inject } from '@angular/core';
import { ItemCart } from 'src/app/models/item-cart.model';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';
import { environment } from 'src/environments/environment';
import { Order } from 'src/app/models/order.model';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface DialogData {
  order_id: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public url = environment.localImages;
  public itemsCart: ItemCart[];
  public displayedColumns: string[] = ['Image', 'Name', 'Amount', 'General Price'];
  public order: Order = new Order();
  public cities: string[];

  constructor(private redux: NgRedux<AppState>,
    private router: Router,
    private ordersServics: OrdersService,
    public dialog: MatDialog, ) { }

  public ngOnInit() {
    this.itemsCart = this.redux.getState().itemsCart;
    this.cities = this.redux.getState().NyCities;
    if (this.redux.getState().user._id === undefined) {
      this.router.navigate(["/home"]);
    } else if (this.redux.getState().itemsCart.length === 0) {
      alert("cart is empty");
      this.router.navigate(["/shop"]);
    }
  };

  public goToShop(): void {
    this.router.navigate(["/shop"]);
  };

  public getTotalAmount(): number {
    return this.itemsCart.map(t => t.amount).reduce((acc, value) => acc + value, 0);
  };

  public getTotalPrice(): number {
    return this.itemsCart.map(t => t.generalPrice).reduce((acc, value) => acc + value, 0);
  };

  public getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  };

  public addOrder(): void {
    const d = new Date(this.order.shippingDate);
    if (d.getTime() <= new Date().getTime()) {
      alert("Delivery date must be future");
      return;
    };

    this.order.totalPrice = this.getTotalPrice();
    this.ordersServics
      .addOrder(this.order)
      .subscribe((o) => {
        this.openDialog(o._id);
        this.ordersServics.updateCartStatus();
      }, err => alert(err));
  };

  public openDialog(_id): void {
    const dialogRef = this.dialog.open(DialogOrder, {
      width: '450px',
      data: { order_id: _id }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(["/home"]);
    });
  };
};

@Component({
  selector: 'app-order-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./orders.component.css']
})
export class DialogOrder {
  constructor(
    public dialogRef: MatDialogRef<DialogOrder>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
};
