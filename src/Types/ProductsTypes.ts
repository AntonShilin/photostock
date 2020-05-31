import { ICuratedPhoto, IDataSearch, IPopularVideos } from "../Interfaces/Interfaces";

export enum DataActionTypes {
  GETDATA = "GETDATA"
}

export enum SearchValueTypes {
  GETSEARCHVALUE = "GETSEARCHVALUE"
}

export enum SearchKeydownTypes {
  SEARCKEYDOWN = "SEARCKEYDOWN"
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

export enum DeletePrevVideo {
  DELETEPREVVIDEO="DELETEPREVVIDEO"
}

export enum likeHeart {
  LIKEHEART="LIKEHEART"
}


/*  interfaces */

export interface ILikeHeartAction {
  type: likeHeart.LIKEHEART;
}

export interface IDeletePrevVideoAction {
  type: DeletePrevVideo.DELETEPREVVIDEO;
  data: null
}


export interface IToggleMenuAction {
  type: ToggleMenu.TOGGLEMENU;
}

export interface ISearchKeydownAction {
  type: SearchKeydownTypes.SEARCKEYDOWN;
  keydownKey: any;
}

export interface IGetSearchValueAction {
  type: SearchValueTypes.GETSEARCHVALUE;
  searchValue: string;
}


export interface IGetPopularPhotoAction {
  type: DataActionTypes.GETDATA;
  popularPhoto: ICuratedPhoto;
}


export interface IDataSearchValueAction {
  type: GetDataSearchValueTypes.GETDATASEARCHVALUE;
  findPhoto: IDataSearch;
}

export interface IPopularVideoAction {
  type: GetPopularVideoTypes.GETPOPULARVIDEO;
  popularVideo: IPopularVideos;
}

export interface IChangeNameVideoAction {
  type: GetChangeNameVideoTypes.GETCHANGENAMEVIDEO;
  value: string;
}

export interface IGetVideoAction{
  type: GetVideoTypes.GETVIDEO;
  findVideo: IPopularVideos;
}

export interface IMoveScrollAction{
  type: MoveScroll.MOVESCROLL;
  scrollTop: number|null;
  scrollHeight: number|null;
  clientHeight: number|null;
}


export type ProductsActions =
  | IGetPopularPhotoAction
  | IGetSearchValueAction
  | IDataSearchValueAction
  | IPopularVideoAction
  | IChangeNameVideoAction
  |ISearchKeydownAction
  | IGetVideoAction
  | IMoveScrollAction
  | IDeletePrevVideoAction
  |ILikeHeartAction
  | IToggleMenuAction;

export interface IProductsState {
  readonly keyboardKey: any;
  readonly data: ICuratedPhoto | null;
  readonly videos: IPopularVideos | null;
  readonly productsLoading: boolean;
  readonly searchNamePhoto: string;
  resultSearchImage: IDataSearch | null;
  readonly searchNameVideo: string;
  resultSearchVideo: IPopularVideos | null;
  readonly isToggleMenu: boolean;
  readonly isScrolling: boolean;
  readonly isScrollTop: number|null;
  readonly isScrollHeight: number|null;
  readonly isClientHeight: number|null;
}
