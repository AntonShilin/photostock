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
  ToggleMenu,
  MoveScroll,
  DeletePrevVideo,
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

    case ToggleMenu.TOGGLEMENU: {
      const elem: any = action.element;
      if (elem.current.style.width === "0%") {
        const f2 = () => {
          let count = 0;
          return () => {
            if (count < 100) {
              count++;
              elem.current.style.width = count + "%";
            } else {
              clearInterval(move);
            }
          };
        };
        const f1 = f2();
        const move = setInterval(f1, 2);
      }

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

   
  }
  return state || initialProductState;
};
