import { Reducer } from "redux";
import {
  ProductsActions,
  IProductsState,
  DataActionTypes,
  SearchValueTypes,
  GetDataSearchValueTypes,
  GetPopularVideoTypes,
  GetChangeNameVideoTypes,
  GetVideoTypes,
  SearchKeydownTypes,
  ToggleMenuTypes,
  MoveScroll,
  DeletePrevVideo,
  likeHeart,
  preplayVideoTypes,
  pauseVideoTypes,
} from "../Types/ProductsTypes";

const initialProductState: IProductsState = {
  productsLoading: false,
  data: null,
  searchNamePhoto: "",
  resultSearchImage: null,
  videos: null,
  searchNameVideo: "",
  resultSearchVideo: null,
  keyboardKey: null,
  isToggleMenu: false,
  isScrolling: false,
  isScrollTop: null,
  isScrollHeight: null,
  isClientHeight: null,
};

export const productsReducer: Reducer<IProductsState, ProductsActions> = (
  state = initialProductState,
  action
) => {
  switch (action.type) {
    case DataActionTypes.GETDATA: {
      return {
        ...state,
        data: action.popularPhoto,
      };
    }

    case SearchKeydownTypes.SEARCKEYDOWN: {
      if (action.keydownKey === 13 || action.keydownKey === 32) {
        if (state.searchNamePhoto !== "") {
          /*   const currentLocation = document.location.pathname;
          const searchphoto = state.searchNamePhoto;
           document.location.assign(currentLocation + "/" + searchphoto);  */
        }
      }

      return {
        ...state,
        keyboardKey: action.keydownKey,
      };
    }

    case SearchValueTypes.GETSEARCHVALUE: {
      return {
        ...state,
        searchNamePhoto: action.searchValue,
      };
    }

    case GetDataSearchValueTypes.GETDATASEARCHVALUE: {
      return {
        ...state,
        searchNamePhoto: "",
        resultSearchImage: action.findPhoto,
      };
    }

    case GetPopularVideoTypes.GETPOPULARVIDEO: {
      return {
        ...state,
        videos: action.popularVideo,
      };
    }

    case GetChangeNameVideoTypes.GETCHANGENAMEVIDEO: {
      return {
        ...state,
        searchNameVideo: action.value,
      };
    }

    case GetVideoTypes.GETVIDEO: {
      return {
        ...state,
        searchNameVideo: "",
        resultSearchVideo: action.findVideo,
      };
    }
      
    case DeletePrevVideo.DELETEPREVVIDEO: {
      return {
        ...state,
        resultSearchVideo: action.data,
      };
    }

    case ToggleMenuTypes.TOGGLEMENU: {

      return {
        ...state,
        isToggleMenu: !state.isToggleMenu,
      };
    }

    case MoveScroll.MOVESCROLL: {
      return {
        ...state,
        isScrolling: action.scrollTop! > 10 ? true : false,
        isScrollTop: action.scrollTop,
        isScrollHeight: action.scrollHeight,
        isClientHeight: action.clientHeight,
      };
    }
      
    case likeHeart.LIKEHEART: {
      return {
        ...state
      };
    }
      
    case preplayVideoTypes.PREPLAYVIDEO: {
      return {
        ...state
      };
    }
      
    case pauseVideoTypes.PAUSEVIDEO: {
      return {
        ...state
      };
    }

   
  }
  return state || initialProductState;
};
