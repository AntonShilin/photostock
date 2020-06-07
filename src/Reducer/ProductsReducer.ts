import { Reducer } from "redux";
import {
  ProductsActions,
  IProductsState,
  GetPopularImagesTypes,
  SearchValueTypes,
  GetPopularVideoTypes,
  GetChangeNameVideoTypes,
  GetVideoTypes,
  SearchKeydownTypes,
  ToggleMenuTypes,
  MoveScroll,
  DeletePrevData,
  likeHeart,
  preplayVideoTypes,
  pauseVideoTypes,
  isLoadingImagesTypes,
  isLoadingVideosTypes,
  SearchImagesByNameTypes,
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
  isLoadingImages:false,
  isLoadingVideos:false
};

export const productsReducer: Reducer<IProductsState, ProductsActions> = (
  state = initialProductState,
  action
) => {
  switch (action.type) {
    case GetPopularImagesTypes.GETPOPULARIMAGES: {
      return {
        ...state,
        data: action.popularPhoto,
        isLoadingImages: action.isLoading
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
        searchNameVideo: action.searchValue
      };
    }

    case SearchImagesByNameTypes.SEARCHIMAGESBYNAME: {
      return {
        ...state,
        resultSearchImage: action.findPhoto,
        isLoadingImages: action.isLoading
      };
    }

    case GetPopularVideoTypes.GETPOPULARVIDEO: {
      return {
        ...state,
        videos: action.popularVideo,
        isLoadingVideos: action.isLoading
      };
    }

    case GetChangeNameVideoTypes.GETCHANGENAMEVIDEO: {
      return {
        ...state,
        searchNameVideo: action.value,
        searchNamePhoto: action.value
      };
    }

    case GetVideoTypes.GETVIDEO: {
      return {
        ...state,
        resultSearchVideo: action.findVideo,
        isLoadingVideos: action.isLoading
      };
    }
      
    case DeletePrevData.DELETEPREVDATA: {
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

    case isLoadingImagesTypes.LOADINGIMAGES: {
      return {
        ...state,
        isLoadingImages:action.isLoading
      };
    }
      
    case isLoadingVideosTypes.LOADINGVIDEOS: {
      return {
        ...state,
        isLoadingVideos:action.isLoading
      };
    }
   
  }
  return state || initialProductState;
};
