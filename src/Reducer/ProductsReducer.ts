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
  SearchKeydownTypes,
  ToggleMenu,
  MoveScroll
} from "../Types/ProductsTypes";

const initialProductState: IProductsState = {
  productsLoading: false,
  data: null,
  searchNamePhoto: "",
  searchDataFromInput: null,
  videos: null,
  searchNameVideo: "",
  resultSearchVideo: null,
  keyboardKey: null,
  isToggleMenu: false,
  isScrolling: false
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
        if (state.searchNamePhoto !== "") {
          /*   const currentLocation = document.location.pathname;
          const searchphoto = state.searchNamePhoto;
           document.location.assign(currentLocation + "/" + searchphoto);  */
        }
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
      console.log(state.searchNamePhoto);
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

    case ToggleMenu.TOGGLEMENU: {
      const elem: any = action.element;
      if (elem.current.style.width === "0%") {
        const f2 = () => {
          let count = 0;
          return () => {
            if (count < 35) {
              count++;
              elem.current.style.width = count + "%";
            } else {
              clearInterval(move);
            }
          };
        };
        const f1 = f2();
        const move = setInterval(f1, 7);
      }

      return {
        ...state,
        isToggleMenu: !state.isToggleMenu
      };
    }

    case MoveScroll.MOVESCROLL: {
      return {
        ...state,
        isScrolling: action.scrollPosition>10 ? true : false
      };
    }
  }
  return state || initialProductState;
};
