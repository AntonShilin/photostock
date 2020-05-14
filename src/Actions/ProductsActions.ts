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
  GetDataSearchValueTypes,
  GetPopularVideoTypes,
  GetChangeNameVideoTypes,
  GetVideoTypes,
  IGetSearchValueAction,
  IProductsState,
  IDataLoadingAction,
  IDataSearchValueAction,
  IPopularVideoAction,
  IChangeNameVideoAction,
  IGetVideoAction,
  ISearchKeydownAction,
  IToggleMenuAction,
  SearchKeydownTypes,
  ToggleMenu,
  IMoveScrollAction,
  MoveScroll,
  ISearchImageByNameAction,
  startSearchImageByNameTypes,
  ISearchVideoByNameAction,
  startSearchVideoByNameTypes,
} from "../Types/ProductsTypes";
import { IPropsPhotosPage } from "../PhotosPage/PhotosPage";
import { IPropsVideosPage } from "../VideosPage/VideosPage";

/* toggle menu button */
export const handleToggleMenu: ActionCreator<IToggleMenuAction> = (
  elem: React.ElementType<HTMLDivElement>
) => ({
  type: ToggleMenu.TOGGLEMENU,
  element: elem,
});

/* get fotos from API for start foto page*/
export const getPopularImages: ActionCreator<ThunkAction<
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

/* what is key code number */
export const handleSearchKeydown: ActionCreator<ISearchKeydownAction> = (
  e: React.KeyboardEvent<HTMLInputElement>
) => ({
  type: SearchKeydownTypes.SEARCKEYDOWN,
  keydownKey: e.keyCode,
});

/* change in input on foto page */
export const handleSearchChange: ActionCreator<IGetSearchValueAction> = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  return {
    type: SearchValueTypes.GETSEARCHVALUE,
    searchValue: e.target.value,
  };
};

/*delete this method*/
export const startSearchPictureByName: ActionCreator<ISearchImageByNameAction> = (
  allprops: IPropsPhotosPage
) => {
  return {
    type: startSearchImageByNameTypes.STARTSEARCHIMAGEBYNAME,
    props: allprops,
  };
};

/*go to the page with results search video by name  */
export const startSearchVideoByName: ActionCreator<ISearchVideoByNameAction> = (
  allprops: IPropsVideosPage
) => {
  return {
  type: startSearchVideoByNameTypes.STARTSEARCHVIDEOBYNAME,
  props: allprops,
  };
}
  

/* get images search by name  */
export const getSearchImages: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IDataSearchValueAction
  >> = (name:string) => {
    return async (dispatch: Dispatch) => {
    const resultSearchImages = await doSearchInputValue(name);
    return dispatch({
      type: GetDataSearchValueTypes.GETDATASEARCHVALUE,
      data: resultSearchImages,
    });
  };
};

/* get videos for start video page*/
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

/* change in input on video page */
export const changeNameVideo: ActionCreator<IChangeNameVideoAction> = (
  e: React.ChangeEvent<HTMLInputElement>
) => ({
  type: GetChangeNameVideoTypes.GETCHANGENAMEVIDEO,
  value: e.target.value,
});

/* get videos search by name*/
export const getSearchVideos: ActionCreator<ThunkAction<
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

/* some scroll events parametres*/
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

