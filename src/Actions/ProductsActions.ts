import { ActionCreator, Dispatch } from "redux";

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
  ILikeHeartAction,
  likeHeart,
  preplayVideoTypes,
  IPreplayVideoAction,
  IPauseVideoAction,
  pauseVideoTypes,
  isLoadingImagesTypes,
  isLoadingVideosTypes,
  GetPopularImagesTypes,
  ILoadingImagesAction,
  ILoadingVideosAction,
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
} from "../Types/ProductsTypes";

/* delete prev video*/
export const deletePrevData: ActionCreator<IDeletePrevDataAction> = () => {
  return {
    type: DeletePrevData.DELETEPREVDATA,
    data: null,
  };
};

/* toggle menu button */
export const handleToggleMenu: ActionCreator<IToggleMenuAction> = (
  elem: React.ElementType<HTMLDivElement>
) => ({
  type: ToggleMenuTypes.TOGGLEMENU,
});

/*  get  fotos for photo page */
export const getPopularImages = () => {
  const keyAPI: string =
    "563492ad6f91700001000001a29e431ec66d410ba87b2a60195328b2";
  return (dispatch: Dispatch) => {
    dispatch(isLoadingImages());
    fetch(`https://api.pexels.com/v1/curated?per_page=50&page=1`, {
      headers: { Authorization: keyAPI },
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
          type: GetPopularImagesTypes.GETPOPULARIMAGES,
          popularPhoto: data,
          isLoading: false,
        })
      );
  };
};

/* get key code number */
export const handleSearchKeydown: ActionCreator<ISearchKeydownAction> = (
  num: React.KeyboardEvent<HTMLInputElement>
) => ({
  type: SearchKeydownTypes.SEARCHKEYDOWN,
  keydownKey: num.keyCode,
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

/*  get popular videos */
export const getPopularVideo = () => {
  const keyAPI: string =
    "563492ad6f91700001000001a29e431ec66d410ba87b2a60195328b2";
  return (dispatch: Dispatch) => {
    dispatch(isLoadingVideos());
    fetch(`https://api.pexels.com/videos/popular?per_page=10&page=1`, {
      headers: { Authorization: keyAPI },
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
export const changeNameVideo: ActionCreator<IChangeNameVideoAction> = (
  e: React.ChangeEvent<HTMLInputElement>
) => ({
  type: GetChangeNameVideoTypes.GETCHANGENAMEVIDEO,
  value: e.target.value,
});

/* get videos search by name*/
export const getSearchVideos = (name: string) => {
  const keyAPI: string =
    "563492ad6f91700001000001a29e431ec66d410ba87b2a60195328b2";
  return (dispatch: Dispatch) => {
    dispatch(deletePrevData());
    dispatch(isLoadingVideos());
    fetch(
      `https://api.pexels.com/videos/search?query=${name}+query&per_page=40&page=1`,
      {
        headers: { Authorization: keyAPI },
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

/* get images search by name  */
export const getSearchImages = (name: string) => {
  const keyAPI: string =
    "563492ad6f91700001000001a29e431ec66d410ba87b2a60195328b2";
  return (dispatch: Dispatch) => {
    dispatch(deletePrevData());
    dispatch(isLoadingImages());
    fetch(
      `https://api.pexels.com/v1/search?query=${name}+query&per_page=50&page=1`,
      {
        headers: { Authorization: keyAPI },
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
export const handleScroll: ActionCreator<IMoveScrollAction> = (event: any) => {
  return {
    type: MoveScroll.MOVESCROLL,
    scrollTop: event.srcElement.scrollingElement.scrollTop,
    scrollHeight: event.srcElement.scrollingElement.scrollHeight,
    clientHeight: event.srcElement.scrollingElement.clientHeight,
  };
};

/*click heart interesting video and foto*/
export const handleLikeHeart: ActionCreator<ILikeHeartAction> = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>
) => {
  e.currentTarget.classList.toggle("liked");
  return {
    type: likeHeart.LIKEHEART,
  };
};

/* preplay video */
export const handlePreplayVideo: ActionCreator<IPreplayVideoAction> = (
  e: React.MouseEvent<HTMLVideoElement, MouseEvent>
) => {
  e.currentTarget.play();
  return {
    type: preplayVideoTypes.PREPLAYVIDEO,
  };
};

/* stop video */
export const handlePauseVideo: ActionCreator<IPauseVideoAction> = (
  e: React.MouseEvent<HTMLVideoElement, MouseEvent>
) => {
  e.currentTarget.pause();
  return {
    type: pauseVideoTypes.PAUSEVIDEO,
  };
};

/* loading page for photos page */
export const isLoadingImages: ActionCreator<ILoadingImagesAction> = () => {
  return {
    type: isLoadingImagesTypes.LOADINGIMAGES,
    isLoading: true,
  };
};

/* loading page for videos page */
export const isLoadingVideos: ActionCreator<ILoadingVideosAction> = () => {
  return {
    type: isLoadingVideosTypes.LOADINGVIDEOS,
    isLoading: true,
  };
};

/* search image and video by suggested word */
export const searchBySuggestedWord = (value: string) => {
  return {
    type: SearchBySuggestedWordTypes.SEARCHBYSUGGESTEDWORD,
    name: value,
  };
};

/* download image */
export const downloadImage = (elem: any) => {
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
export const getIdPhoto = (id: number) => {
  return {
    type: GetIdPhotoTypes.GETIDPHOTO,
    id,
  };
};

/* toggle modal window for photo page */
export const toggleWindowPhotoPage: ActionCreator<IToggleWindowPhotoPageAction> = () => {
  return {
    type: ToggleWindowPhotoPageTypes.TOGGLEWINDOWPHOTOPAGE,
  };
};

/*watching image forward in modal window*/
export const watchingImageForward = (id: number) => {
  ++id;
  return {
    type: ImageForwardTypes.IMAGEFORWARD,
    stepForward: id,
  };
};

/*watching image back in modal window*/
export const watchingImageBack = (id: number) => {
  --id;
  return {
    type: ImageBackTypes.IMAGEBACK,
    stepBack: id,
  };
};

/*show/hide dropmenu in modal window for photo page */
export const toggleDropMenuPhotoPage: ActionCreator<IToggleDropMenuPhotoPageAction> = () => {
  return {
    type: ToggleDropMenuPhotoPageTypes.TOGGLEDROPMENUPHOTOPAGE,
  };
};

/*select image size for download  */
export const handleSelectImageSize: ActionCreator<ISelectImageSizeAction> = (
  size: string
) => {
  return {
    type: SelectImageSizeTypes.SELECTIMAGESIZE,
    size,
  };
};

/* download select size image */
export const downloadSelectImageSize: ActionCreator<IDownloadImageSizeAction> = (
  elem: any,
  sizeURL: string
) => {
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
export const clearEarlierSize: ActionCreator<IClearEarlierSizeAction> = () => {
  return {
    type: ClearEarlierSizeTypes.CLEAREARLIERSIZE,
    clear: undefined,
  };
};

/* clear all radio boxes from dropdown menu */
export const clearRadioBoxes: ActionCreator<IClearRadioBoxesAction> = (
  inputs: any
) => {
  inputs.map((elem: any) => (elem.checked = false));

  return {
    type: ClearRadioBoxesTypes.CLEARRADIOBOXES,
  };
};
