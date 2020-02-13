import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { Cart } from '../models/cart.model';
import { ItemCart } from '../models/item-cart.model';



// The data in the application level:
export class AppState {
  public user: User = {};
  public products: Product[] = [];
  public product: Product = {};
  public cart: Cart = new Cart();
  public itemsCart: ItemCart[] = [];
  public NyCities: string[] = ["New York", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica", "White Plains", "Hempstead", "Troy", "Niagara Falls", "Binghamton", "Freeport", "Valley Stream"]
};