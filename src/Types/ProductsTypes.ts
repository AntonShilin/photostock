import { ICuratedPhoto, IDataSearch, IPopularVideos } from "../ProductsData/ProductsData";
import { IPropsPhotosPage } from "../PhotosPage/PhotosPage";
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

export enum startSearchImageByNameTypes {
  STARTSEARCHIMAGEBYNAME = "STARTSEARCHIMAGEBYNAME" 
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

export enum startSearchVideoByNameTypes {
  STARTSEARCHVIDEOBYNAME = "STARTSEARCHVIDEOBYNAME" 
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

export enum MoveScroll {
  MOVESCROLL="MOVESCROLL"
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

export interface ISearchVideoByNameAction {
  type: startSearchVideoByNameTypes.STARTSEARCHVIDEOBYNAME;
  props: IPropsVideosPage;
}

export interface IDataLoadingAction {
  type: DataActionTypes.GETDATA;
  dataFromAPI: ICuratedPhoto;
}


export interface ISearchImageByNameAction {
  type: startSearchImageByNameTypes.STARTSEARCHIMAGEBYNAME;
  props: IPropsPhotosPage;
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

export interface IMoveScrollAction{
  type: MoveScroll.MOVESCROLL;
  scrollTop: number|null;
  scrollHeight: number|null;
  clientHeight: number|null;
}


export type ProductsActions =
  | IDataLoadingAction
  | IGetSearchValueAction
  | ISearchImageByNameAction
  | IDataSearchValueAction
  | IPopularVideoAction
  | ISearchVideoByNameAction
  | IChangeNameVideoAction
  |ISearchKeydownAction
  | IGetVideoAction
  | IMoveScrollAction
  | IToggleMenuAction;

export interface IProductsState {
  readonly keyboardKey: any;
  readonly data: ICuratedPhoto | null;
  readonly videos: IPopularVideos | null;
  readonly productsLoading: boolean;
  readonly searchNamePhoto: string;
  readonly resultSearchImage: IDataSearch | null;
  readonly searchNameVideo: string;
  readonly resultSearchVideo: IPopularVideos | null;
  readonly isToggleMenu: boolean;
  readonly isScrolling: boolean;
  readonly isScrollTop: number|null;
  readonly isScrollHeight: number|null;
  readonly isClientHeight: number|null;
}
