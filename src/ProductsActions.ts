import { ActionCreator, AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { getProducts as getProductsFromAPI } from "./ProductsData";
import {
  ProductsActionTypes,
  IProductsGetAllAction,
  IProductsLoadingAction,
  IProductsState
} from "./ProductsTypes";

const loading: ActionCreator<IProductsLoadingAction> = () => ({
  type: ProductsActionTypes.LOADING
});

export const getProducts: ActionCreator<ThunkAction<Promise<AnyAction>,
  IProductsState,
  null,
  IProductsGetAllAction
>> = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loading());
    const products = await getProductsFromAPI();
    return dispatch({
      products,
      type: ProductsActionTypes.GETALL
    });
  };
};
