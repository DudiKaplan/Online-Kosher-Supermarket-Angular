import { Cart } from './cart.model';
import { User } from './user.model';
import { Data } from '@angular/router';

export class Order {
    constructor(
        public _id?: string,
        public user?: User | string,
        public cart?: Cart | string,
        public totalPrice?: number,
        public city?: string,
        public street?: string,
        public shippingDate?: string,
        public creditCard?: string
    ) { }
}
