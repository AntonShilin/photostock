import { ActionCreator, AnyAction, Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  getPhotos,
  doSearchInputValue,
  getPopularVideos,
  searchVideos
} from "./ProductsData";
import {
  DataActionTypes,
  SearchValueTypes,
  SearchKeydownTypes,
  GetSearchNameTypes,
  GetDataSearchValueTypes,
  GetPopularVideoTypes,
  GetResultSearchVideoTypes,
  GetChangeNameVideoTypes,
  GetVideoTypes,
  IGetSearchValueAction,
  IProductsState,
  IDataLoadingAction,
  ISearchKeydownAction,
  ISearchNameGetAction,
  IDataSearchValueAction,
  IPopularVideoAction,
  IGetResultSearchVideoAction,
  IChangeNameVideoAction,
  IGetVideoAction
} from "./ProductsTypes";
import { IProps } from "./PhotosPage";
import { IPropsVideosPage } from "./VideosPage";

export const getData: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IDataLoadingAction
>> = () => {
  return async (dispatch: Dispatch) => {
    const data = await getPhotos();
    return dispatch({
      type: DataActionTypes.GETDATA,
      dataFromAPI: data
    });
  };
};

export const handleSearchChange: ActionCreator<IGetSearchValueAction> = (
  e: React.ChangeEvent<HTMLInputElement>
) => ({
  type: SearchValueTypes.GETSEARCHVALUE,
  searchValue: e.target.value
});

export const handleSearchKeydown: ActionCreator<ISearchKeydownAction> = (
  e: React.KeyboardEvent<HTMLInputElement>
) => ({
  type: SearchKeydownTypes.SEARCKEYDOWN,
  keydownKey: e.keyCode
});

export const handleSearchName: ActionCreator<ISearchNameGetAction> = (
  allprops: IProps
) => ({
  type: GetSearchNameTypes.GETSEARCHNAME,
  props: allprops
});

export const showResultSearchVideo: ActionCreator<IGetResultSearchVideoAction> = (
  allprops: IPropsVideosPage
) => ({
  type: GetResultSearchVideoTypes.GETRESULTSEARCHVIDEO,
  props: allprops
});

export const handleSearchData: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IDataSearchValueAction
>> = name => {
  return async (dispatch: Dispatch) => {
    const resultSearch = await doSearchInputValue(name);
    return dispatch({
      type: GetDataSearchValueTypes.GETDATASEARCHVALUE,
      data: resultSearch
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
      videoFiles: data
    });
  };
};

export const changeNameVideo: ActionCreator<IChangeNameVideoAction> = (
  e: React.ChangeEvent<HTMLInputElement>
) => ({
  type: GetChangeNameVideoTypes.GETCHANGENAMEVIDEO,
  value: e.target.value
});



export const getVideo: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IGetVideoAction
>> = (name) => {
  return async (dispatch: Dispatch) => {
    const data = await searchVideos(name);
    return dispatch({
      type: GetVideoTypes.GETVIDEO,
      dataVideo: data
    });
  };
};