import { ICuratedPhoto, IDataSearch, IPopularVideos } from "../Interfaces/Interfaces";

export enum GetPopularImagesTypes {
  GETPOPULARIMAGES = "GETPOPULARIMAGES"
}

export enum SearchValueTypes {
  GETSEARCHVALUE = "GETSEARCHVALUE"
}

export enum SearchKeydownTypes {
  SEARCKEYDOWN = "SEARCKEYDOWN"
}


export enum SearchImagesByNameTypes {
  SEARCHIMAGESBYNAME = "SEARCHIMAGESBYNAME"
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

export enum ToggleMenuTypes {
  TOGGLEMENU="TOGGLEMENU"
}

export enum MoveScroll {
  MOVESCROLL="MOVESCROLL"
}

export enum DeletePrevData {
  DELETEPREVDATA="DELETEPREVDATA"
}

export enum likeHeart {
  LIKEHEART="LIKEHEART"
}

export enum preplayVideoTypes {
  PREPLAYVIDEO="PREPLAYVIDEO"
}

export enum pauseVideoTypes {
  PAUSEVIDEO="PAUSEVIDEO"
}

export enum isLoadingImagesTypes {
  LOADINGIMAGES="LOADINGIMAGES"
}

export enum isLoadingVideosTypes {
  LOADINGVIDEOS="LOADINGVIDEOS"
}


/*  interfaces */
export interface ILoadingImagesAction {
  type: isLoadingImagesTypes.LOADINGIMAGES
  isLoading: boolean
}

export interface ILoadingVideosAction {
  type: isLoadingVideosTypes.LOADINGVIDEOS
  isLoading: boolean
}

export interface IPauseVideoAction {
  type: pauseVideoTypes.PAUSEVIDEO
}


export interface IPreplayVideoAction {
  type: preplayVideoTypes.PREPLAYVIDEO
}

export interface ILikeHeartAction {
  type: likeHeart.LIKEHEART;
}

export interface IDeletePrevDataAction {
  type: DeletePrevData.DELETEPREVDATA;
  data: null
}


export interface IToggleMenuAction {
  type: ToggleMenuTypes.TOGGLEMENU;
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
  type: GetPopularImagesTypes.GETPOPULARIMAGES;
  popularPhoto: ICuratedPhoto;
  isLoading: boolean;
}


export interface ISearchImagesByNameAction {
  type: SearchImagesByNameTypes.SEARCHIMAGESBYNAME
  findPhoto: IDataSearch;
  isLoading: boolean;
}

export interface IPopularVideoAction {
  type: GetPopularVideoTypes.GETPOPULARVIDEO;
  popularVideo: IPopularVideos;
  isLoading: boolean;
}

export interface IChangeNameVideoAction {
  type: GetChangeNameVideoTypes.GETCHANGENAMEVIDEO;
  value: string;
}

export interface IGetVideoAction{
  type: GetVideoTypes.GETVIDEO;
  findVideo: IPopularVideos;
  isLoading: boolean;
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
  | ISearchImagesByNameAction
  | IPopularVideoAction
  | IChangeNameVideoAction
  |ISearchKeydownAction
  | IGetVideoAction
  | IMoveScrollAction
  | IDeletePrevDataAction
  | ILikeHeartAction
  | IPreplayVideoAction
  | IPauseVideoAction
  |ILoadingImagesAction
  |ILoadingVideosAction
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
  readonly isLoadingImages: boolean;
  readonly isLoadingVideos: boolean;
}
