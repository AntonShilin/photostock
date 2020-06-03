import { ActionCreator, Dispatch } from "redux";

import {
  DataActionTypes,
  SearchValueTypes,
  GetDataSearchValueTypes,
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
  DeletePrevVideo,
  IDeletePrevVideoAction,
  ILikeHeartAction,
  likeHeart,
  preplayVideoTypes,
  IPreplayVideoAction,
  IPauseVideoAction,
  pauseVideoTypes,
} from "../Types/ProductsTypes";

/* delete prev video*/
export const deletePrevVideo: ActionCreator<IDeletePrevVideoAction> = () => {
  return {
    type: DeletePrevVideo.DELETEPREVVIDEO,
    data: null,
  };
};

/* toggle menu button */
export const handleToggleMenu: ActionCreator<IToggleMenuAction> = (
  elem: React.ElementType<HTMLDivElement>
) => ({
  type: ToggleMenuTypes.TOGGLEMENU,
});

/*  get popular fotos */
export const getPopularImages = () => {
  const keyAPI: string =
    "563492ad6f91700001000001a29e431ec66d410ba87b2a60195328b2";
  return (dispatch: Dispatch) => {
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
          type: DataActionTypes.GETDATA,
          popularPhoto: data,
        })
      );
  };
};

/* get key code number */
export const handleSearchKeydown: ActionCreator<ISearchKeydownAction> = (
  e: React.KeyboardEvent<HTMLInputElement>
) => ({
  type: SearchKeydownTypes.SEARCKEYDOWN,
  keydownKey: e.keyCode,
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
    dispatch(deletePrevVideo());
    fetch(
      `https://api.pexels.com/videos/search?query=${name}+query&per_page=50&page=1`,
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
        })
      );
  };
};

/* get images search by name  */
export const getSearchImages = (name: string) => {
  const keyAPI: string =
    "563492ad6f91700001000001a29e431ec66d410ba87b2a60195328b2";
  return (dispatch: Dispatch) => {
    dispatch(deletePrevVideo());
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
          type: GetDataSearchValueTypes.GETDATASEARCHVALUE,
          findPhoto: data,
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
 e: React.MouseEvent<SVGSVGElement,MouseEvent>
) => {
  e.currentTarget.classList.toggle('liked');
  return {
    type: likeHeart.LIKEHEART,
  };
};


/* preplay video */
export const handlePreplayVideo: ActionCreator<IPreplayVideoAction> = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
  e.currentTarget.play();
  return {
    type: preplayVideoTypes.PREPLAYVIDEO
  }
}

/* stop video */
export const handlePauseVideo: ActionCreator<IPauseVideoAction> = (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => {
  e.currentTarget.pause();
  return {
    type: pauseVideoTypes.PAUSEVIDEO
  }
}