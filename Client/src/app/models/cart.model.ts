import { User } from './user.model';

export class Cart {
    constructor(
        public _id?: string,
        public user?: User | string,
        public creationDate?: number,
        public isOrder?: boolean,
    ) { }
}
