import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/app-state';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public file: File;
  public product: Product = {}
  public categories: Category[];
  public category:Category = new Category(" "," ");

  constructor(private productsService: ProductsService,
    private router: Router,
    protected redux:NgRedux<AppState>) { }

  ngOnInit() {
    
    this.redux.subscribe(() => this.product = this.redux.getState().product);
    this.productsService
      .getAllCategories()
      .subscribe(
        categories => {
          this.categories = categories
          //for category name in input
          for (const category of categories) {
            if (category._id === this.product.category._id){
              this.category = category;
              break
            };
          };
        },
        err => alert(err.message)
      )
      this.product = this.redux.getState().product;
  };

  public onFileSelect(args): void {
    this.file = args.target.files[0];
  };

  public addProduct(): void {
    this.productsService.updateProductAsync(this.product, this.file)
    this.product = {};
  };

};