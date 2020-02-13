import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  public url = environment.localImages;

  @Input()
  public name: string;

  @Input()
  public price: number;

  @Input()
  public image: string;

};
