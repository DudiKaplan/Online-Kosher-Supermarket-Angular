import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from "@angular/forms";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatIconModule } from '@angular/material/icon';
import { NgRedux, NgReduxModule } from "ng2-redux";
import { AppState } from './redux/app-state';
import { Reducer } from './redux/reducer';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ShopComponent, Dialog } from './components/shop/shop.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CartComponent } from './components/cart/cart.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { OrdersComponent, DialogOrder } from './components/orders/orders.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
    declarations: [LayoutComponent, HeaderComponent, HomeComponent, PageNotFoundComponent, RegistrationComponent, LoginComponent, LogoutComponent, AddProductComponent, ShopComponent, ProductsComponent, ProductComponent, EditProductComponent, CartComponent, Dialog, OrdersComponent, DialogOrder],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatGridListModule, MatSliderModule, MatCheckboxModule, MatButtonModule, HttpClientModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatIconModule, NgReduxModule, MatButtonToggleModule, MatDialogModule, MatTableModule],
    entryComponents: [Dialog, DialogOrder],
    providers: [],
    bootstrap: [LayoutComponent]
})
export class AppModule {
    public constructor(redux: NgRedux<AppState>) {
        redux.configureStore(Reducer.reduce, new AppState());
    }
};
