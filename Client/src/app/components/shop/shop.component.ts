import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemCart } from 'src/app/models/item-cart.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { IAction } from 'src/app/redux/action';
import { ActionType } from 'src/app/redux/action-type';

export interface DialogData {
  amount: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public amount: number = 1;
  public itemCart = new ItemCart();

  constructor(private router: Router,
    private redux: NgRedux<AppState>,
    public dialog: MatDialog,
    public cartsService: CartService,
    public productsService: ProductsService) { }

  ngOnInit() {
    if (this.redux.getState().user._id === undefined) {
      this.router.navigate(["/home"]);
    }
  };

  public getEventProduct(_id: string): void {
    if (this.redux.getState().user.isUser) {
      if (this.redux.getState().cart._id === undefined) {
        this.cartsService.createCart();
      };
      this.itemCart.product = _id;
      this.openDialog();
    } else {
      const product = this.redux.getState().products.find(p => p._id === _id)
      const action: IAction = {
        type: ActionType.StartEditProduct,
        payload: product
      }
      this.redux.dispatch(action);
    };

  };

  public openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
      width: '250px',
      data: { amount: this.amount }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.amount = 1;
      this.itemCart.amount = result;
      if (result < 1) {
        alert("Amount must be a positive number");
        return;
      }
      this.cartsService.addItemCart(this.itemCart);
    });
  };
};

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./shop.component.css']
})
export class Dialog {

  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
};
