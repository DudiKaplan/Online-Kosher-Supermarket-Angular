import { Cart } from './cart.model';
import { Product } from './product.model';

export class ItemCart {
    constructor(
        public _id?: string,
        public cart?: Cart | string,
        public product?: string | Product,
        public amount?: number,
        public generalPrice?: number,
        public imageName?: string,
        public productName?: string
    ) { }
}
