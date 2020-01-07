import { Reducer } from "redux";
import {
  ProductsActions,
  IProductsState,
  DataActionTypes,
  SearchKeydownTypes,
  GetSearchNameTypes,
  SearchValueTypes,
  GetDataSearchValueTypes
} from "./ProductsTypes";

const initialProductState: IProductsState = {
  productsLoading: false,
  data: null,
  search: "",
  keyboardKey: null,
  searchDataFromInput: null
};

export const productsReducer: Reducer<IProductsState, ProductsActions> = (
  state = initialProductState,
  action
) => {
  switch (action.type) {
    case DataActionTypes.GETDATA: {
      return {
        ...state,
        data: action.dataFromAPI
      };
    }
    case SearchValueTypes.GETSEARCHVALUE: {
      return {
        ...state,
        search: action.searchValue
      };
    }
    case SearchKeydownTypes.SEARCKEYDOWN: {
      return {
        ...state,
        keyboardKey: action.keydownKey
      };
    }
    case GetSearchNameTypes.GETSEARCHNAME: {
      const url:any = action.props;
      url.history.push(`/products/${state.search}`);
      return {
        ...state,
      };
    }
      
    case GetDataSearchValueTypes.GETDATASEARCHVALUE: {
      return {
        ...state,
        searchDataFromInput: action.data
      };
    }
  }
  return state || initialProductState;
};
