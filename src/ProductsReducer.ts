import { Reducer } from "redux";
import {
  ProductsActions,
  IProductsState,
  DataActionTypes,
  GetSearchNameTypes,
  SearchValueTypes,
  GetDataSearchValueTypes,
  GetPopularVideoTypes,
  GetSearchVideoTypes,
  GetResultSearchVideoTypes,
  GetChangeNameVideoTypes,
  GetVideoTypes,
  SearchKeydownTypes
} from "./ProductsTypes";

const initialProductState: IProductsState  = {
  productsLoading: false,
  data: null,
  searchNamePhoto: "",
  searchDataFromInput: null,
  videos: null,
  searchNameVideo: "",
  resultSearchVideo: null,
  keyboardKey: null
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

    case SearchKeydownTypes.SEARCKEYDOWN: {
      if (action.keydownKey === 13 || action.keydownKey === 32) {
        console.log(state);
      // history.push(history.location.pathname+"/"+ state.search)
      }
      return {
        ...state,
        keyboardKey: action.keydownKey
      };
    }

    case SearchValueTypes.GETSEARCHVALUE: {
      return {
        ...state,
        searchNamePhoto: action.searchValue
      };
    }

    case GetSearchNameTypes.GETSEARCHNAME: {
      const currentDocument: any = action.props;
      console.log(state.searchNamePhoto)
      currentDocument.history.push(`/photos/${state.searchNamePhoto}`);
      return {
        ...state
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
      const currentDocument: any = action.props;
      currentDocument.history.push(`/videos/${state.searchNameVideo}`);
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
