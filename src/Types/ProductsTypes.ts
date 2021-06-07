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

export enum VideoBackTypes {
  VIDEOBACK = "VIDEOBACK",
}

export enum VideoForwardTypes {
  VIDEOFORWARD = "VIDEOFORWARD",
}

export enum ToggleDropMenuPhotoPageTypes {
  TOGGLEDROPMENUPHOTOPAGE = "TOGGLEDROPMENUPHOTOPAGE",
}

export enum ToggleDropMenuVideoPageTypes {
  TOGGLEDROPMENUVIDEOPAGE = "TOGGLEDROPMENUVIDEOPAGE",
}

export enum SelectImageSizeTypes {
  SELECTIMAGESIZE = "SELECTIMAGESIZE",
}

export enum SelectVideoSizeTypes {
  SELECTVIDEOSIZE = "SELECTVIDEOSIZE",
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

export enum ClearKeyPressNumberTypes {
  CLEARKEYPRESSNUMBER = "CLEARKEYPRESSNUMBER",
}

export enum PopularVideoBackTypes {
  POPULARVIDEOBACK = "POPULARVIDEOBACK",
}

export enum PopularVideoForwardTypes {
  POPULARVIDEOFORWARD = "POPULARVIDEOFORWARD",
}

export enum ClearVideoIDTypes {
  CLEARVIDEOID = "CLEARVIDEOID",
}

export enum ClearPhotoIdTypes {
  CLEARPHOTOID = "CLEARPHOTOID",
}

export enum PopularImageForwardTypes {
  POPULARIMAGEFORWARD = "POPULARIMAGEFORWARD",
}

export enum PopularImageBackTypes {
  POPULARIMAGEBACK = "POPULARIMAGEBACK",
}

export enum isLoadingSearchImagesByNameTypes {
  ISLOADINGSEARCHIMAGESBYNAME = "ISLOADINGSEARCHIMAGESBYNAME",
}

export enum isLoadingPopularImagesTypes {
  ISLOADINGPOPULARIMAGES = "ISLOADINGPOPULARIMAGES",
}

export enum isLoadingSearchVideosByNameTypes {
  ISLOADINGSEARCHVIDEOSBYNAME = "ISLOADINGSEARCHVIDEOSBYNAME",
}

export enum isLoadingPopularVideosTypes {
  ISLOADINGPOPULARVIDEOS = "ISLOADINGPOPULARVIDEOS",
}

/*  interfaces */

export interface ILoadingPopularVideosAction {
  type: isLoadingPopularVideosTypes.ISLOADINGPOPULARVIDEOS
  isLoading: boolean;
}

export interface ILoadingSearchVideosByNameAction {
  type: isLoadingSearchVideosByNameTypes.ISLOADINGSEARCHVIDEOSBYNAME;
  isLoading: boolean;
}

export interface ILoadingPopularImagesAction {
  type: isLoadingPopularImagesTypes.ISLOADINGPOPULARIMAGES;
  isLoading: boolean;
}

export interface ILoadingSearchImagesByNameAction {
  type: isLoadingSearchImagesByNameTypes.ISLOADINGSEARCHIMAGESBYNAME;
  isLoading: boolean;
}

export interface IPopularImageBackAction {
  type: PopularImageBackTypes.POPULARIMAGEBACK;
  stepBack: number;
}

export interface IPopularImageForwardAction {
  type: PopularImageForwardTypes.POPULARIMAGEFORWARD;
  stepForward: number;
}

export interface IClearPhotoIdAction {
  type: ClearPhotoIdTypes.CLEARPHOTOID;
  pos: number;
}

export interface IClearVideoIDAction {
  type: ClearVideoIDTypes.CLEARVIDEOID;
  pos: number;
}

export interface IPopularVideoBackAction {
  type: PopularVideoBackTypes.POPULARVIDEOBACK;
  stepBack: number;
}

export interface IPopularVideoForwardAction {
  type: PopularVideoForwardTypes.POPULARVIDEOFORWARD;
  stepForward: number;
}

export interface IClearKeyPressNumberAction {
  type: ClearKeyPressNumberTypes.CLEARKEYPRESSNUMBER;
  keyPressNumber: null;
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

export interface ISelectVideoSizeAction {
  type: SelectVideoSizeTypes.SELECTVIDEOSIZE;
  size: string;
}

export interface IToggleDropMenuPhotoPageAction {
  type: ToggleDropMenuPhotoPageTypes.TOGGLEDROPMENUPHOTOPAGE;
}

export interface IToggleDropMenuVideoPageAction {
  type: ToggleDropMenuVideoPageTypes.TOGGLEDROPMENUVIDEOPAGE;
}

export interface IImageBackAction {
  type: ImageBackTypes.IMAGEBACK;
  stepBack: number;
}

export interface IImageForwardAction {
  type: ImageForwardTypes.IMAGEFORWARD;
  stepForward: number;
}

export interface IVideoBackAction {
  type: VideoBackTypes.VIDEOBACK;
  stepBack: number;
}

export interface IVideoForwardAction {
  type: VideoForwardTypes.VIDEOFORWARD;
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

/* actions */
export type ProductsActions =
  |ILoadingPopularVideosAction
  | ILoadingPopularImagesAction
  | ILoadingSearchVideosByNameAction
  | ILoadingSearchImagesByNameAction
  | IPopularImageForwardAction
  | IPopularImageBackAction
  | IClearPhotoIdAction
  | IClearVideoIDAction
  | IPopularVideoForwardAction
  | IPopularVideoBackAction
  | IClearKeyPressNumberAction
  | IToggleDropMenuVideoPageAction
  | ISelectVideoSizeAction
  | IVideoBackAction
  | IVideoForwardAction
  | IGetPopularPhotoAction
  | IGetSearchValueAction
  | ISearchImagesByNameAction
  | IPopularVideoAction
  | IChangeNameVideoAction
  | ISearchKeydownAction
  | IGetVideoAction
  | IMoveScrollAction
  | IDeletePrevDataAction
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

/* state */
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
  readonly isLoadingPopularImages: boolean;
  readonly isLoadingPopularVideos: boolean;
  readonly suggestedWords: string[];
  readonly isLoadingSearchImagesByName: boolean;
  readonly isLoadingSearchVideosByName: boolean;
  readonly modalWindowPhotoPage: {
    id: number | null;
    isOpen: boolean;
    isOpenDropDownMenu: boolean;
    sizeURL: string | undefined;
  };
  readonly modalWindowVideoPage: {
    id: number;
    isOpen: boolean;
    isOpenDropDownMenu: boolean;
    sizeURL: string | undefined;
    sizeVideoURL: string | undefined;
  };
}
