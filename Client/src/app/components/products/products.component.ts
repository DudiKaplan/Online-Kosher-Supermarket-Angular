import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public categories: Category[];
  public products: Product[];
  public searchValue: string;
  public infoMessage: string;

  constructor(private productsService: ProductsService,
    private redux: NgRedux<AppState>, private router: Router) { }

  ngOnInit() {
    this.productsService
      .getAllCategories()
      .subscribe(categories => { this.categories = categories },
        err => alert(err));

    this.redux.subscribe(() => {
      const products = this.redux.getState().products;
      this.products = products;
      if (products.length === 0) { this.infoMessage = "No results searched" }
    });

    this.infoMessage = "Click on a category or search to see products";
  };

  public getProductsPerCategory(_id: string): void {
    this.productsService.getProductsPerCategory(_id);
  };

  public getProductByName(): void {
    this.productsService.getProductByName(this.searchValue);
  };

  @Output()
  public productEnterEvent: EventEmitter<string> = new EventEmitter<string>();

  public emitProductID(_id: string): void {
    this.productEnterEvent.emit(_id);

  };

}
