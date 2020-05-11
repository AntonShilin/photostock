import { ActionCreator, AnyAction, Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  getPopularPhotos,
  doSearchInputValue,
  getPopularVideos,
  searchVideos,
} from "../ProductsData/ProductsData";
import {
  DataActionTypes,
  SearchValueTypes,
  GetSearchNameTypes,
  GetDataSearchValueTypes,
  GetPopularVideoTypes,
  GetResultSearchVideoTypes,
  GetChangeNameVideoTypes,
  GetVideoTypes,
  IGetSearchValueAction,
  IProductsState,
  IDataLoadingAction,
  ISearchNameGetAction,
  IDataSearchValueAction,
  IPopularVideoAction,
  IGetResultSearchVideoAction,
  IChangeNameVideoAction,
  IGetVideoAction,
  ISearchKeydownAction,
  IToggleMenuAction,
  SearchKeydownTypes,
  ToggleMenu,
  IMoveScrollAction,
  MoveScroll,
  stickInput,
  IStickInputAction,
} from "../Types/ProductsTypes";
import { IProps } from "../PhotosPage/PhotosPage";
import { IPropsVideosPage } from "../VideosPage/VideosPage";

export const handleToggleMenu: ActionCreator<IToggleMenuAction> = (
  elem: React.ElementType<HTMLDivElement>
) => ({
  type: ToggleMenu.TOGGLEMENU,
  element: elem,
});

export const getData: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IDataLoadingAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const data = await getPopularPhotos();
    return dispatch({
      type: DataActionTypes.GETDATA,
      dataFromAPI: data,
    });
  };
};

export const handleSearchKeydown: ActionCreator<ISearchKeydownAction> = (
  e: React.KeyboardEvent<HTMLInputElement>
) => ({
  type: SearchKeydownTypes.SEARCKEYDOWN,
  keydownKey: e.keyCode,
});

export const handleSearchChange: ActionCreator<IGetSearchValueAction> = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  return {
    type: SearchValueTypes.GETSEARCHVALUE,
    searchValue: e.target.value,
  };
};

export const goToResultPageSearchPictureName: ActionCreator<ISearchNameGetAction> = (
  allprops: IProps
) => {
  return {
    type: GetSearchNameTypes.GETSEARCHNAME,
    props: allprops,
  };
};

export const showResultSearchVideo: ActionCreator<IGetResultSearchVideoAction> = (
  allprops: IPropsVideosPage
) => ({
  type: GetResultSearchVideoTypes.GETRESULTSEARCHVIDEO,
  props: allprops,
});

export const getImages: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IDataSearchValueAction
>> = (name) => {
  return async (dispatch: Dispatch) => {
    const resultSearch = await doSearchInputValue(name);
    return dispatch({
      type: GetDataSearchValueTypes.GETDATASEARCHVALUE,
      data: resultSearch,
    });
  };
};

export const getPopularVideo: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IPopularVideoAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const data = await getPopularVideos();
    return dispatch({
      type: GetPopularVideoTypes.GETPOPULARVIDEO,
      videoFiles: data,
    });
  };
};

export const changeNameVideo: ActionCreator<IChangeNameVideoAction> = (
  e: React.ChangeEvent<HTMLInputElement>
) => ({
  type: GetChangeNameVideoTypes.GETCHANGENAMEVIDEO,
  value: e.target.value,
});

export const getVideo: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IGetVideoAction
>> = (name: string) => {
  return async (dispatch: Dispatch) => {
    const data = await searchVideos(name);
    return dispatch({
      type: GetVideoTypes.GETVIDEO,
      dataVideo: data,
    });
  };
};

export const handleScroll: ActionCreator<IMoveScrollAction> = (
  event:any
) => {
  console.log(event.target.srcElement);
  //  console.log(event.srcElement.scrollingElement.scrollTop);
  return {
    type: MoveScroll.MOVESCROLL,
    scrollTop: event.srcElement.scrollingElement.scrollTop,
    scrollHeight: event.srcElement.scrollingElement.scrollHeight,
    clientHeight: event.srcElement.scrollingElement.clientHeight,
  };
};

export const stickInputToTheTop: ActionCreator<IStickInputAction> = (
  elem: HTMLDivElement
) => {
  //  elem.classList.add('stick-top');
  // elem.style.position = "fixed";
//  elem.style.top = 0.5 + "rem";
  // elem.style.left = 5 + "rem";
//  elem.style.maxWidth = 80 + "%";
//  elem.style.zIndex = "5";
  return {
    type: stickInput.STICKINPUT,
  };
};
