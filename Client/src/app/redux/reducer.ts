import { AppState } from './app-state';
import { IAction } from './action';
import { ActionType } from './action-type';

export class Reducer {

    public static reduce(oldState: AppState, action: IAction): AppState {

        const newState: AppState = { ...oldState };

        switch (action.type) {
            case ActionType.LoginUser:
                newState.user = action.payload;
                break;
            case ActionType.LogoutUser:
                newState.user = action.payload;
                newState.cart = {};
                newState.product = {};
                newState.products = [];
                newState.itemsCart = [];
                break;
            case ActionType.StartShopping:
                newState.cart = {};
                newState.product = {};
                newState.products = [];
                newState.itemsCart = [];
                break
            case ActionType.GetProducts:
                newState.products = action.payload;
                break
            case ActionType.StartEditProduct:
                newState.product = action.payload
                break
            case ActionType.GetCart:
                newState.cart = action.payload;
                break
            case ActionType.AddItemCart:
                newState.itemsCart.push(action.payload);
                break
            case ActionType.DeleteAllItemsCart:
                newState.itemsCart = [];
                break
            case ActionType.ResumeShopping:
                newState.cart = action.payload.cart;
                newState.itemsCart = action.payload.itemsCart;
                break
            case ActionType.DeleteOneItemCart:
                for (let i = 0; i < newState.itemsCart.length; i++) {
                    if (newState.itemsCart[i]._id === action.payload) {
                        if (i === 0) {
                            newState.itemsCart.shift();
                        } else {
                            newState.itemsCart.splice(i, i);
                        }
                    };
                };
                break
            case ActionType.UpdateProduct:
                newState.product = {}
                for (let i = 0; i < newState.products.length; i++) {
                    if (newState.products[i]._id === action.payload._id) {

                        if (newState.products[i].category._id === action.payload.category._id) {
                            if (i === 0) {
                                newState.products.shift();
                            } else {
                                newState.products.splice(i, i);
                            }
                        } else {
                            newState.products[i].imageName = action.payload.imageName;
                            newState.products[i].price = action.payload.price;
                        };
                    };
                };
                break
            case ActionType.AddProduct:
                if (newState.products.length > 0) {
                    if (newState.products[0].category._id !== action.payload.category._id) {
                        newState.products.push(action.payload)
                    }
                }
                break
        }

        return newState;
    }
}