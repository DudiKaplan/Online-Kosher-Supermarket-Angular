import { Category } from './category.model';

export class Product {
    constructor(
        public _id?: string,
        public name?: string,
        public category?: Category,
        public price?: number,
        public imageName?: string
    ) { }
}
