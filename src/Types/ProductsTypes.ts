import { ICuratedPhoto, IDataSearch, IPopularVideos } from "../ProductsData/ProductsData";
import { IProps } from "../PhotosPage/PhotosPage";
import { IPropsVideosPage } from "../VideosPage/VideosPage";

export enum DataActionTypes {
  GETDATA = "GETDATA"
}

export enum SearchValueTypes {
  GETSEARCHVALUE = "GETSEARCHVALUE"
}

export enum SearchKeydownTypes {
  SEARCKEYDOWN = "SEARCKEYDOWN"
}

export enum GetSearchNameTypes {
  GETSEARCHNAME = "GETSEARCHNAME"
}

export enum GetDataSearchValueTypes {
  GETDATASEARCHVALUE = "GETDATASEARCHVALUE"
}

export enum GetPopularVideoTypes {
  GETPOPULARVIDEO = "GETPOPULARVIDEO"
}

export enum GetSearchVideoTypes {
  GETSEARCHVIDEO = "GETSEARCHVIDEO"
}
// GetSearchNameVideoTypes

export enum GetResultSearchVideoTypes {
  GETRESULTSEARCHVIDEO = "GETRESULTSEARCHVIDEO"
}

export enum GetChangeNameVideoTypes {
  GETCHANGENAMEVIDEO = "GETCHANGENAMEVIDEO"
}

export enum GetVideoTypes {
  GETVIDEO = "GETVIDEO"
}

export enum ToggleMenu {
  TOGGLEMENU="TOGGLEMENU"
}

/*  interfaces */

export interface IToggleMenuAction {
  type: ToggleMenu.TOGGLEMENU;
  element: React.ElementType<HTMLDivElement>
}

export interface ISearchKeydownAction {
  type: SearchKeydownTypes.SEARCKEYDOWN;
  keydownKey: any;
}

export interface IGetSearchValueAction {
  type: SearchValueTypes.GETSEARCHVALUE;
  searchValue: string;
}

export interface IGetResultSearchVideoAction {
  type: GetResultSearchVideoTypes.GETRESULTSEARCHVIDEO;
  props: IPropsVideosPage;
}

export interface IDataLoadingAction {
  type: DataActionTypes.GETDATA;
  dataFromAPI: ICuratedPhoto;
}


export interface ISearchNameGetAction {
  type: GetSearchNameTypes.GETSEARCHNAME;
  props: IProps;
}

export interface IDataSearchValueAction {
  type: GetDataSearchValueTypes.GETDATASEARCHVALUE;
  data: IDataSearch;
}

export interface IPopularVideoAction {
  type: GetPopularVideoTypes.GETPOPULARVIDEO;
  videoFiles: IPopularVideos;
}

export interface IChangeNameVideoAction {
  type: GetChangeNameVideoTypes.GETCHANGENAMEVIDEO;
  value: string;
}

export interface IGetVideoAction{
  type: GetVideoTypes.GETVIDEO;
  dataVideo: IPopularVideos;
}


export type ProductsActions =
  | IDataLoadingAction
  | IGetSearchValueAction
  | ISearchNameGetAction
  | IDataSearchValueAction
  | IPopularVideoAction
  | IGetResultSearchVideoAction
  | IChangeNameVideoAction
  |ISearchKeydownAction
  | IGetVideoAction
  | IToggleMenuAction;

export interface IProductsState {
  readonly keyboardKey: any;
  readonly data: ICuratedPhoto | null;
  readonly videos: IPopularVideos | null;
  readonly productsLoading: boolean;
  readonly searchNamePhoto: string;
  readonly searchDataFromInput: IDataSearch | null;
  readonly searchNameVideo: string;
  readonly resultSearchVideo: IPopularVideos | null;
  readonly isToggleMenu: boolean;
}
