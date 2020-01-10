import { ActionCreator, AnyAction, Dispatch, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { getPhotos, doSearchInputValue, getPopularVideos } from "./ProductsData";
import {
  DataActionTypes,
  SearchValueTypes,
  SearchKeydownTypes,
  GetSearchNameTypes,
  GetDataSearchValueTypes,
  GetPopularVideoTypes,
  IGetSearchValueAction,
  IProductsState,
  IDataLoadingAction,
  ISearchKeydownAction,
  ISearchNameGetAction,
  IDataSearchValueAction,
  IPopularVideoAction
} from "./ProductsTypes";
import { IProps } from "./PhotosPage";


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


export const handleSearchData: ActionCreator<ThunkAction<
  Promise<AnyAction>,
  IProductsState,
  null,
  IDataSearchValueAction
>> = (name) => {
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