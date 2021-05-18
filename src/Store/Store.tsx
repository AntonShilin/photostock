import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { accountReducer } from "../Reducer/AccountReducer";
import { productsReducer } from "../Reducer/ProductsReducer";


const rootReducer = combineReducers({
  products: productsReducer,
  account: accountReducer
});

export type IApplicationState = ReturnType<typeof rootReducer>

export default function configureStore(){
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  store.subscribe(() => console.log("Store subscribe",store.getState()))
  return store;
}


