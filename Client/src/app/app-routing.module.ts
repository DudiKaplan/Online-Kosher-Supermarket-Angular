import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ShopComponent } from './components/shop/shop.component';
import { OrdersComponent } from './components/orders/orders.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "shop", component: ShopComponent },
  { path: "order", component: OrdersComponent },
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
