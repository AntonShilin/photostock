import { Reducer } from "redux";
import {
  ProductsActions,
  IProductsState,
  DataActionTypes,
  SearchKeydownTypes,
  GetSearchNameTypes,
  SearchValueTypes,
  GetDataSearchValueTypes,
  GetPopularVideoTypes,
  GetSearchVideoTypes,
  GetResultSearchVideoTypes,
  GetChangeNameVideoTypes,
  GetVideoTypes
} from "./ProductsTypes";

const initialProductState: IProductsState = {
  productsLoading: false,
  data: null,
  search: "",
  keyboardKey: null,
  searchDataFromInput: null,
  videos: null,
  searchNameVideo: "",
  resultSearchVideo: null
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
      url.history.push(`/photos/${state.search}`);
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
      
    case GetPopularVideoTypes.GETPOPULARVIDEO: {
      return {
        ...state,
        videos: action.videoFiles
      };
    }
     
      
    case GetResultSearchVideoTypes.GETRESULTSEARCHVIDEO: {
      const url:any = action.props;
      url.history.push(`/videos/${state.searchNameVideo}`);
      return {
        ...state
      };
    }
    
    case GetChangeNameVideoTypes.GETCHANGENAMEVIDEO: {
      return {
        ...state,
        searchNameVideo: action.value
      };
    }

      
    case GetVideoTypes.GETVIDEO: {
      return {
        ...state,
        resultSearchVideo: action.dataVideo
      };
    }
      
      
  }
  return state || initialProductState;
};
