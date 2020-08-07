import {
  ICuratedPhoto,
  IDataSearch,
  IPopularVideos,
} from "../Interfaces/Interfaces";

export enum GetPopularImagesTypes {
  GETPOPULARIMAGES = "GETPOPULARIMAGES",
}

export enum SearchValueTypes {
  GETSEARCHVALUE = "GETSEARCHVALUE",
}

export enum SearchKeydownTypes {
  SEARCHKEYDOWN = "SEARCHKEYDOWN",
}

export enum SearchImagesByNameTypes {
  SEARCHIMAGESBYNAME = "SEARCHIMAGESBYNAME",
}

export enum GetPopularVideoTypes {
  GETPOPULARVIDEO = "GETPOPULARVIDEO",
}

export enum GetSearchVideoTypes {
  GETSEARCHVIDEO = "GETSEARCHVIDEO",
}

export enum GetChangeNameVideoTypes {
  GETCHANGENAMEVIDEO = "GETCHANGENAMEVIDEO",
}

export enum GetVideoTypes {
  GETVIDEO = "GETVIDEO",
}

export enum ToggleMenuTypes {
  TOGGLEMENU = "TOGGLEMENU",
}

export enum MoveScroll {
  MOVESCROLL = "MOVESCROLL",
}

export enum DeletePrevData {
  DELETEPREVDATA = "DELETEPREVDATA",
}

export enum likeHeart {
  LIKEHEART = "LIKEHEART",
}

export enum preplayVideoTypes {
  PREPLAYVIDEO = "PREPLAYVIDEO",
}

export enum pauseVideoTypes {
  PAUSEVIDEO = "PAUSEVIDEO",
}

export enum isLoadingImagesTypes {
  LOADINGIMAGES = "LOADINGIMAGES",
}

export enum isLoadingVideosTypes {
  LOADINGVIDEOS = "LOADINGVIDEOS",
}

export enum SearchBySuggestedWordTypes {
  SEARCHBYSUGGESTEDWORD = "SEARCHBYSUGGESTEDWORD",
}

export enum DownloadImageTypes {
  DOWNLOADIMAGE = "DOWNLOADIMAGE",
}

export enum GetIdPhotoTypes {
  GETIDPHOTO = "GETIDPHOTO",
}

export enum GetIdVideoTypes {
  GETIDVIDEO = "GETIDVIDEO",
}

export enum ToggleWindowPhotoPageTypes {
  TOGGLEWINDOWPHOTOPAGE = "TOGGLEWINDOWPHOTOPAGE",
}

export enum ToggleWindowVideoPageTypes {
  TOGGLEWINDOWVIDEOPAGE = "TOGGLEWINDOWVIDEOPAGE",
}

export enum ImageForwardTypes {
  IMAGEFORWARD = "IMAGEFORWARD",
}

export enum ImageBackTypes {
  IMAGEBACK = "IMAGEBACK",
}

export enum ToggleDropMenuPhotoPageTypes {
  TOGGLEDROPMENUPHOTOPAGE = "TOGGLEDROPMENUPHOTOPAGE",
}

export enum SelectImageSizeTypes {
  SELECTIMAGESIZE = "SELECTIMAGESIZE",
}

export enum DownloadImageSizeTypes {
  DOWNLOADIMAGESIZE = "DOWNLOADIMAGESIZE",
}

export enum ClearEarlierSizeTypes {
  CLEAREARLIERSIZE = "CLEAREARLIERSIZE",
}

export enum ClearRadioBoxesTypes {
  CLEARRADIOBOXES = "CLEARRADIOBOXES",
}

export enum ToggleBtnMediaPlayerTypes {
  TOGGLEBTNMEDIAPLAYER = "TOGGLEBTNMEDIAPLAYER",
}

export enum StopMediaPlayerTypes {
  STOPMEDIAPLAYER = "STOPMEDIAPLAYER",
}

export enum StartMediaPlayerTypes {
  STARTMEDIAPLAYER = "STARTMEDIAPLAYER",
}

export enum SetCurrentTimeTypes {
  SETCURRENTTIME = "SETCURRENTTIME",
}

export enum PauseMediaPlayerTypes {
  PAUSEMEDIAPLAYER = "PAUSEMEDIAPLAYER",
}




/*  interfaces */

export interface IPauseMediaPlayerAction {
  type: PauseMediaPlayerTypes.PAUSEMEDIAPLAYER
}


export interface ISetCurrentTimeAction {
  type: SetCurrentTimeTypes.SETCURRENTTIME
  time: number;
}

export interface IStartMediaPlayerAction {
  type: StartMediaPlayerTypes.STARTMEDIAPLAYER
  timer: any;
}

export interface IStopMediaPlayerAction {
  type: StopMediaPlayerTypes.STOPMEDIAPLAYER;
  time: number;
}

export interface IToggleBtnMediaPlayerAction {
  type: ToggleBtnMediaPlayerTypes.TOGGLEBTNMEDIAPLAYER;
  isPlay: boolean;
}

export interface IClearRadioBoxesAction {
  type: ClearRadioBoxesTypes.CLEARRADIOBOXES;
}

export interface IClearEarlierSizeAction {
  type: ClearEarlierSizeTypes.CLEAREARLIERSIZE;
  clear: undefined;
}

export interface IDownloadImageSizeAction {
  type: DownloadImageSizeTypes.DOWNLOADIMAGESIZE;
}

export interface ISelectImageSizeAction {
  type: SelectImageSizeTypes.SELECTIMAGESIZE;
  size: string;
}

export interface IToggleDropMenuPhotoPageAction {
  type: ToggleDropMenuPhotoPageTypes.TOGGLEDROPMENUPHOTOPAGE;
}

export interface IImageBackAction {
  type: ImageBackTypes.IMAGEBACK;
  stepBack: number;
}

export interface IImageForwardAction {
  type: ImageForwardTypes.IMAGEFORWARD;
  stepForward: number;
}

export interface IToggleWindowPhotoPageAction {
  type: ToggleWindowPhotoPageTypes.TOGGLEWINDOWPHOTOPAGE;
}

export interface IToggleWindowVideoPageAction {
  type: ToggleWindowVideoPageTypes.TOGGLEWINDOWVIDEOPAGE;
}

export interface IShowDetailsPhotoAction {
  type: GetIdPhotoTypes.GETIDPHOTO;
  id: number;
}

export interface IShowDetailsVideoAction {
  type: GetIdVideoTypes.GETIDVIDEO;
  id: number;
}

export interface IDownloadImageAction {
  type: DownloadImageTypes.DOWNLOADIMAGE;
}

export interface ISearchBySuggestedWordAction {
  type: SearchBySuggestedWordTypes.SEARCHBYSUGGESTEDWORD;
  name: string;
}

export interface ILoadingImagesAction {
  type: isLoadingImagesTypes.LOADINGIMAGES;
  isLoading: boolean;
}

export interface ILoadingVideosAction {
  type: isLoadingVideosTypes.LOADINGVIDEOS;
  isLoading: boolean;
}

export interface IPauseVideoAction {
  type: pauseVideoTypes.PAUSEVIDEO;
}

export interface IPreplayVideoAction {
  type: preplayVideoTypes.PREPLAYVIDEO;
}

export interface ILikeHeartAction {
  type: likeHeart.LIKEHEART;
}

export interface IDeletePrevDataAction {
  type: DeletePrevData.DELETEPREVDATA;
  data: null;
}

export interface IToggleMenuAction {
  type: ToggleMenuTypes.TOGGLEMENU;
}

export interface ISearchKeydownAction {
  type: SearchKeydownTypes.SEARCHKEYDOWN;
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
  type: SearchImagesByNameTypes.SEARCHIMAGESBYNAME;
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

export interface IGetVideoAction {
  type: GetVideoTypes.GETVIDEO;
  findVideo: IPopularVideos;
  isLoading: boolean;
}

export interface IMoveScrollAction {
  type: MoveScroll.MOVESCROLL;
  scrollTop: number | null;
  scrollHeight: number | null;
  clientHeight: number | null;
}

export type ProductsActions =
  |IPauseMediaPlayerAction
  |ISetCurrentTimeAction
  |IStartMediaPlayerAction
  |IStopMediaPlayerAction
  |IToggleBtnMediaPlayerAction
  | IGetPopularPhotoAction
  | IGetSearchValueAction
  | ISearchImagesByNameAction
  | IPopularVideoAction
  | IChangeNameVideoAction
  | ISearchKeydownAction
  | IGetVideoAction
  | IMoveScrollAction
  | IDeletePrevDataAction
  | ILikeHeartAction
  | IPreplayVideoAction
  | IPauseVideoAction
  | ILoadingImagesAction
  | ILoadingVideosAction
  | ILoadingImagesAction
  | ISearchBySuggestedWordAction
  | IDownloadImageAction
  | IShowDetailsPhotoAction
  | IShowDetailsVideoAction
  | IToggleWindowPhotoPageAction
  | IToggleWindowVideoPageAction
  | IImageForwardAction
  | IImageBackAction
  | ISelectImageSizeAction
  | IToggleDropMenuPhotoPageAction
  | IDownloadImageSizeAction
  | IClearEarlierSizeAction
  | IClearRadioBoxesAction
  | IToggleMenuAction;

export interface IProductsState {
  readonly keyboardKey: number | null;
  readonly data: ICuratedPhoto | null;
  readonly videos: IPopularVideos | null;
  readonly productsLoading: boolean;
  readonly searchNamePhoto: string | "";
  resultSearchImage: IDataSearch | null;
  readonly searchNameVideo: string | "";
  resultSearchVideo: IPopularVideos | null;
  readonly isToggleMenu: boolean;
  readonly isScrolling: boolean;
  readonly isScrollTop: number | null;
  readonly isScrollHeight: number | null;
  readonly isClientHeight: number | null;
  readonly isLoadingImages: boolean;
  readonly isLoadingVideos: boolean;
  readonly suggestedWords: string[];
  readonly modalWindowPhotoPage: {
    id: number | null;
    isOpen: boolean;
    isOpenDropDownMenu: boolean;
    sizeURL: string | undefined;
  };
  readonly modalWindowVideoPage: {
    id: number[];
    isOpen: boolean;
    isOpenDropDownMenu: boolean;
    sizeURL: string | undefined;
    isPlay: boolean;
    timer: number;
    currentTime: number;
  };
}


