import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public file: File;
  public product = new Product();
  public categories: Category[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService
      .getAllCategories()
      .subscribe(
        categories => this.categories = categories,
        err => alert(err.message)
      )
  };

  public onFileSelect(args): void {
    this.file = args.target.files[0];
  };

  public addProduct(): void {
    this.productsService.addProductAsync(this.product, this.file);
    this.closeAddProductEvent.emit();
  };

  @Output()
  public closeAddProductEvent: EventEmitter<undefined> = new EventEmitter<undefined>();

};
