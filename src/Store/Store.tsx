import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "../Reducer/ProductsReducer";
import { IProductsState } from "../Types/ProductsTypes";

export interface IApplicationState {
  products: IProductsState;
}

const rootReducer = combineReducers<IApplicationState>({
  products: productsReducer
});

export default function configureStore(): Store<IApplicationState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  store.subscribe(() => console.log("Store subscribe",store.getState()))
  return store;
}


