import {
  IPopularVideoForwardAction,
  PopularVideoForwardTypes,
  IPopularVideoBackAction,
  PopularVideoBackTypes,
  ClearVideoIDTypes,
  ClearPhotoIdTypes,
  IPopularImageForwardAction,
  PopularImageForwardTypes,
  IPopularImageBackAction,
  PopularImageBackTypes,
  ILoadingSearchImagesByNameAction,
  isLoadingSearchImagesByNameTypes,
  ILoadingSearchVideosByNameAction,
  isLoadingSearchVideosByNameTypes,
  ILoadingPopularImagesAction,
  isLoadingPopularImagesTypes,
  ILoadingPopularVideosAction,
  isLoadingPopularVideosTypes,
} from "./../Types/ProductsTypes";
import {
  SearchValueTypes,
  GetPopularVideoTypes,
  GetChangeNameVideoTypes,
  GetVideoTypes,
  IGetSearchValueAction,
  IChangeNameVideoAction,
  ISearchKeydownAction,
  IToggleMenuAction,
  SearchKeydownTypes,
  ToggleMenuTypes,
  IMoveScrollAction,
  MoveScroll,
  DeletePrevData,
  IDeletePrevDataAction,
  GetPopularImagesTypes,
  SearchImagesByNameTypes,
  SearchBySuggestedWordTypes,
  DownloadImageTypes,
  ToggleWindowPhotoPageTypes,
  ToggleDropMenuPhotoPageTypes,
  IToggleWindowPhotoPageAction,
  GetIdPhotoTypes,
  ImageForwardTypes,
  ImageBackTypes,
  IToggleDropMenuPhotoPageAction,
  SelectImageSizeTypes,
  ISelectImageSizeAction,
  IDownloadImageSizeAction,
  DownloadImageSizeTypes,
  IClearEarlierSizeAction,
  ClearEarlierSizeTypes,
  ClearRadioBoxesTypes,
  IClearRadioBoxesAction,
  IImageBackAction,
  IImageForwardAction,
  IShowDetailsPhotoAction,
  IDownloadImageAction,
  ISearchBySuggestedWordAction,
  ISearchImagesByNameAction,
  IGetVideoAction,
  IPopularVideoAction,
  IGetPopularPhotoAction,
  IToggleWindowVideoPageAction,
  ToggleWindowVideoPageTypes,
  IShowDetailsVideoAction,
  GetIdVideoTypes,
  IVideoForwardAction,
  VideoForwardTypes,
  IVideoBackAction,
  VideoBackTypes,
  ISelectVideoSizeAction,
  SelectVideoSizeTypes,
  IToggleDropMenuVideoPageAction,
  ToggleDropMenuVideoPageTypes,
  IClearKeyPressNumberAction,
  ClearKeyPressNumberTypes,
} from "../Types/ProductsTypes";

const keyApi: string =
  "563492ad6f9170000100000130a559403d65480189d8b56e5e05791c";

/* delete prev video*/
export const deletePrevData = (): IDeletePrevDataAction => {
  return {
    type: DeletePrevData.DELETEPREVDATA,
    data: null,
  };
};

/* toggle menu button */
export const handleToggleMenu = (): IToggleMenuAction => ({
  type: ToggleMenuTypes.TOGGLEMENU,
});

export const isLoadingPopularImages = (
  value: boolean
): ILoadingPopularImagesAction => {
  return {
    type: isLoadingPopularImagesTypes.ISLOADINGPOPULARIMAGES,
    isLoading: value,
  };
};

/*  get  fotos for photo page */
export const getPopularImages = () => {
  return (
    dispatch: (
      arg0: IGetPopularPhotoAction | ILoadingPopularImagesAction
    ) => void
  ) => {
    dispatch(isLoadingPopularImages(true));
    fetch(`https://api.pexels.com/v1/curated?page=1&per_page=40`, {
      headers: { Authorization: keyApi },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.statusText);
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GetPopularImagesTypes.GETPOPULARIMAGES,
          popularPhoto: data,
          isLoading: false,
        })
      );
  };
};

/* get key code number */
export const handleSearchKeydown = (
  e: React.KeyboardEvent<HTMLInputElement>
): ISearchKeydownAction => ({
  type: SearchKeydownTypes.SEARCHKEYDOWN,
  keydownKey: e.keyCode,
});

/* change in input on foto page */
export const handleSearchChange = (
  e: React.ChangeEvent<HTMLInputElement>
): IGetSearchValueAction => {
  return {
    type: SearchValueTypes.GETSEARCHVALUE,
    searchValue: e.target.value,
  };
};

export const isLoadingPopularVideos = (
  value: boolean
): ILoadingPopularVideosAction => {
  return {
    type: isLoadingPopularVideosTypes.ISLOADINGPOPULARVIDEOS,
    isLoading: value,
  };
};

/*  get popular videos */
export const getPopularVideo = () => {
  return (
    dispatch: (arg0: IPopularVideoAction | ILoadingPopularVideosAction) => void
  ) => {
    dispatch(isLoadingPopularVideos(true));
    fetch(`https://api.pexels.com/videos/popular?per_page=10&page=1`, {
      headers: { Authorization: keyApi },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GetPopularVideoTypes.GETPOPULARVIDEO,
          popularVideo: data,
          isLoading: false,
        })
      );
  };
};

/* change in input on video page */
export const changeNameVideo = (
  e: React.ChangeEvent<HTMLInputElement>
): IChangeNameVideoAction => ({
  type: GetChangeNameVideoTypes.GETCHANGENAMEVIDEO,
  value: e.target.value,
});

export const isLoadingSearchVideosByName = (
  value: boolean
): ILoadingSearchVideosByNameAction => {
  return {
    type: isLoadingSearchVideosByNameTypes.ISLOADINGSEARCHVIDEOSBYNAME,
    isLoading: value,
  };
};

/* get videos search by name*/
export const getSearchVideos = (name: string) => {
  return (
    dispatch: (
      arg0:
        | IDeletePrevDataAction
        | IGetVideoAction
        | ILoadingSearchVideosByNameAction
    ) => void
  ) => {
    dispatch(deletePrevData());
    dispatch(isLoadingSearchVideosByName(true));
    fetch(
      `https://api.pexels.com/videos/search?query=${name}+query&per_page=40&page=1`,
      {
        headers: { Authorization: keyApi },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: GetVideoTypes.GETVIDEO,
          findVideo: data,
          isLoading: false,
        })
      );
  };
};

export const isLoadingSearchImagesByName = (
  value: boolean
): ILoadingSearchImagesByNameAction => {
  return {
    type: isLoadingSearchImagesByNameTypes.ISLOADINGSEARCHIMAGESBYNAME,
    isLoading: value,
  };
};

//  get images search by name
export const getSearchImages = (name: string) => {
  return (
    dispatch: (
      arg0:
        | IDeletePrevDataAction
        | ISearchImagesByNameAction
        | ILoadingSearchImagesByNameAction
    ) => void
  ) => {
    dispatch(deletePrevData());
    dispatch(isLoadingSearchImagesByName(true));
    fetch(
      `https://api.pexels.com/v1/search?query=${name}+query&per_page=50&page=1`,
      {
        headers: { Authorization: keyApi },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: SearchImagesByNameTypes.SEARCHIMAGESBYNAME,
          findPhoto: data,
          isLoading: false,
        })
      );
  };
};

/* some scroll events parametres*/
export const handleScroll = (event: any): IMoveScrollAction => {
  return {
    type: MoveScroll.MOVESCROLL,
    scrollTop: event.srcElement.scrollingElement.scrollTop,
    scrollHeight: event.srcElement.scrollingElement.scrollHeight,
    clientHeight: event.srcElement.scrollingElement.clientHeight,
  };
};

/* search image and video by suggested word */
export const searchBySuggestedWord = (
  value: string
): ISearchBySuggestedWordAction => {
  return {
    type: SearchBySuggestedWordTypes.SEARCHBYSUGGESTEDWORD,
    name: value,
  };
};

/* download image */
export const downloadImage = (elem: any): IDownloadImageAction => {
  while (elem.children.length > 1) {
    elem.removeChild(elem.lastChild);
  }
  const image = elem.parentNode.parentNode.firstChild;
  const w = elem.parentNode.parentNode.firstChild.width;
  const h = elem.parentNode.parentNode.firstChild.height;
  const canvas = document.createElement("canvas");
  canvas.style.display = "none";
  const ctx = canvas.getContext("2d");
  canvas.width = w;
  canvas.height = h;

  ctx!.drawImage(image, 0, 0);
  const dataURL = canvas.toDataURL();
  elem.href = dataURL;
  elem.setAttribute("target", "_blank");
  elem.rel = "noopener noreferrer";

  return {
    type: DownloadImageTypes.DOWNLOADIMAGE,
  };
};

/* get ID photo from photo page */
export const getIdPhoto = (id: number): IShowDetailsPhotoAction => {
  return {
    type: GetIdPhotoTypes.GETIDPHOTO,
    id,
  };
};

/* get ID video from video page */
export const getIdVideo = (id: number): IShowDetailsVideoAction => {
  return {
    type: GetIdVideoTypes.GETIDVIDEO,
    id,
  };
};

/* toggle modal window for photo page */
export const toggleWindowPhotoPage = (): IToggleWindowPhotoPageAction => {
  return {
    type: ToggleWindowPhotoPageTypes.TOGGLEWINDOWPHOTOPAGE,
  };
};

/* toggle modal window for video page */
export const toggleWindowVideoPage = (): IToggleWindowVideoPageAction => {
  return {
    type: ToggleWindowVideoPageTypes.TOGGLEWINDOWVIDEOPAGE,
  };
};

/*watching image forward in modal window*/
export const watchingImageForward = (id: number): IImageForwardAction => {
  ++id;
  return {
    type: ImageForwardTypes.IMAGEFORWARD,
    stepForward: id,
  };
};

/*watching image back in modal window*/
export const watchingImageBack = (id: number): IImageBackAction => {
  --id;
  return {
    type: ImageBackTypes.IMAGEBACK,
    stepBack: id,
  };
};

/*show/hide dropmenu in modal window for photo page */
export const toggleDropMenuPhotoPage = (): IToggleDropMenuPhotoPageAction => {
  return {
    type: ToggleDropMenuPhotoPageTypes.TOGGLEDROPMENUPHOTOPAGE,
  };
};

/*show/hide dropmenu in modal window for video page */
export const toggleDropMenuVideoPage = (): IToggleDropMenuVideoPageAction => {
  return {
    type: ToggleDropMenuVideoPageTypes.TOGGLEDROPMENUVIDEOPAGE,
  };
};

/*select image size for download  */
export const handleSelectImageSize = (size: string): ISelectImageSizeAction => {
  return {
    type: SelectImageSizeTypes.SELECTIMAGESIZE,
    size,
  };
};

/* download select size image */
export const downloadSelectImageSize = (
  elem: any,
  sizeURL: string
): IDownloadImageSizeAction => {
  while (elem.children.length > 0) {
    elem.removeChild(elem.lastChild);
  }

  const image = document.createElement("img");
  image.setAttribute("crossorigin", "anonymous");
  image.setAttribute("src", sizeURL);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const x = sizeURL.match(/(w)=(\d+)/g);
  const w = x !== null ? x![0].match(/\d+/g) : ["1000"];

  const y = sizeURL.match(/(h)=(\d+)/g);
  const h = y !== null ? y![0].match(/\d+/g) : ["1000"];
  canvas.width = +w![0];
  canvas.height = +h![0];

  image.style.display = "none";
  canvas.style.display = "none";

  elem.appendChild(image);
  elem.appendChild(canvas);

  image.onload = () => {
    ctx!.drawImage(image, 0, 0);
    const link = document.createElement("a");
    link.download = "image.png";
    link.setAttribute("target", "_blank");
    link.rel = "noopener noreferrer";

    const dataURL = canvas.toDataURL();
    link.href = dataURL;
    link.click();
    link.parentNode?.removeChild(link);
  };

  return {
    type: DownloadImageSizeTypes.DOWNLOADIMAGESIZE,
  };
};

/* clear earlier selected image size */
export const clearEarlierSize = (): IClearEarlierSizeAction => {
  return {
    type: ClearEarlierSizeTypes.CLEAREARLIERSIZE,
    clear: undefined,
  };
};

/* clear all radio boxes from dropdown menu */
export const clearRadioBoxes = (inputs: any): IClearRadioBoxesAction => {
  inputs.map((elem: any) => (elem.checked = false));
  return {
    type: ClearRadioBoxesTypes.CLEARRADIOBOXES,
  };
};

/*watching result video forward in modal window*/
export const watchingVideoForward = (id: number): IVideoForwardAction => {
  ++id;
  return {
    type: VideoForwardTypes.VIDEOFORWARD,
    stepForward: id,
  };
};

/*watching result video back in modal window*/
export const watchingVideoBack = (id: number): IVideoBackAction => {
  --id;
  return {
    type: VideoBackTypes.VIDEOBACK,
    stepBack: id,
  };
};

/*select video size for download  */
export const handleSelectVideoSize = (size: string): ISelectVideoSizeAction => {
  return {
    type: SelectVideoSizeTypes.SELECTVIDEOSIZE,
    size,
  };
};

/* clear earlier selected image size */
export const clearKeyPressNumber = (): IClearKeyPressNumberAction => {
  return {
    type: ClearKeyPressNumberTypes.CLEARKEYPRESSNUMBER,
    keyPressNumber: null,
  };
};

/*watching popular video forward in modal window*/
export const watchingPopularVideoForward = (
  id: number
): IPopularVideoForwardAction => {
  ++id;
  return {
    type: PopularVideoForwardTypes.POPULARVIDEOFORWARD,
    stepForward: id,
  };
};

/*watching popular video back in modal window*/
export const watchingPopularVideoBack = (
  id: number
): IPopularVideoBackAction => {
  --id;
  return {
    type: PopularVideoBackTypes.POPULARVIDEOBACK,
    stepBack: id,
  };
};

/* set defaul position id after close modalvideowindow and modalresultvideowindow */
export const clearVideoID = () => {
  return {
    type: ClearVideoIDTypes.CLEARVIDEOID,
    pos: 0,
  };
};

/* set defaul position id after close modalphotowindow and modalresultphotowindow */
export const clearPhotoID = () => {
  return {
    type: ClearPhotoIdTypes.CLEARPHOTOID,
    pos: 0,
  };
};

/*watching popular image forward in modal window*/
export const watchingPopularImageForward = (
  id: number
): IPopularImageForwardAction => {
  ++id;
  return {
    type: PopularImageForwardTypes.POPULARIMAGEFORWARD,
    stepForward: id,
  };
};

/*watching popular image back in modal window*/
export const watchingPopularImageBack = (
  id: number
): IPopularImageBackAction => {
  --id;
  return {
    type: PopularImageBackTypes.POPULARIMAGEBACK,
    stepBack: id,
  };
};
