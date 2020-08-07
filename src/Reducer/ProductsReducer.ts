import {
  ProductsActions,
  IProductsState,
  GetPopularImagesTypes,
  SearchValueTypes,
  GetPopularVideoTypes,
  GetChangeNameVideoTypes,
  GetVideoTypes,
  SearchKeydownTypes,
  ToggleMenuTypes,
  MoveScroll,
  DeletePrevData,
  likeHeart,
  preplayVideoTypes,
  pauseVideoTypes,
  isLoadingImagesTypes,
  isLoadingVideosTypes,
  SearchImagesByNameTypes,
  SearchBySuggestedWordTypes,
  DownloadImageTypes,
  ToggleWindowPhotoPageTypes,
  GetIdPhotoTypes,
  ImageForwardTypes,
  ImageBackTypes,
  ToggleDropMenuPhotoPageTypes,
  SelectImageSizeTypes,
  DownloadImageSizeTypes,
  ClearEarlierSizeTypes,
  ClearRadioBoxesTypes,
  ToggleWindowVideoPageTypes,
  GetIdVideoTypes,
  ToggleBtnMediaPlayerTypes,
  StopMediaPlayerTypes,
  SetCurrentTimeTypes,
  StartMediaPlayerTypes,
  PauseMediaPlayerTypes,
} from "../Types/ProductsTypes";

const initialProductState: IProductsState = {
  productsLoading: false,
  data: null,
  searchNamePhoto: "",
  resultSearchImage: null,
  videos: null,
  searchNameVideo: "",
  resultSearchVideo: null,
  keyboardKey: null,
  isToggleMenu: false,
  isScrolling: false,
  isScrollTop: null,
  isScrollHeight: null,
  isClientHeight: null,
  isLoadingImages: false,
  isLoadingVideos: false,
  suggestedWords: [
    "mountain",
    "sport",
    "town",
    "ball",
    "bike",
    "butterfly",
    "sea",
    "ocean",
    "london",
    "sky",
    "prague",
    "wave",
    "village",
    "country side",
  ],
  modalWindowPhotoPage: {
    id: 0,
    isOpen: false,
    isOpenDropDownMenu: false,
    sizeURL: undefined,
  },
  modalWindowVideoPage: {
    id: [1],
    isOpen: false,
    isOpenDropDownMenu: false,
    sizeURL: undefined,
    isPlay: false,
    timer: 0,
    currentTime: 0,
  },
};

export const productsReducer = (
  state: IProductsState = initialProductState,
  action: ProductsActions
): IProductsState => {
  switch (action.type) {
    case GetPopularImagesTypes.GETPOPULARIMAGES: {
      action.popularPhoto.photos.map((elem, i) => {
        elem.id = i;
      });
      return {
        ...state,
        data: action.popularPhoto,
        isLoadingImages: action.isLoading,
      };
    }

    case SearchKeydownTypes.SEARCHKEYDOWN: {
      return {
        ...state,
        keyboardKey: action.keydownKey,
      };
    }

    case SearchValueTypes.GETSEARCHVALUE: {
      return {
        ...state,
        searchNamePhoto: action.searchValue,
        searchNameVideo: action.searchValue,
      };
    }

    case SearchImagesByNameTypes.SEARCHIMAGESBYNAME: {
      action.findPhoto.photos.map((elem, i) => {
        elem.id = i;
      });
      return {
        ...state,
        resultSearchImage: action.findPhoto,
        isLoadingImages: action.isLoading,
      };
    }

    case GetPopularVideoTypes.GETPOPULARVIDEO: {
      action.popularVideo.videos.map((elem, i) => {
        elem.id = i;
      });
      return {
        ...state,
        videos: action.popularVideo,
        isLoadingVideos: action.isLoading,
      };
    }

    case GetChangeNameVideoTypes.GETCHANGENAMEVIDEO: {
      return {
        ...state,
        searchNameVideo: action.value,
        searchNamePhoto: action.value,
      };
    }

    case GetVideoTypes.GETVIDEO: {
      return {
        ...state,
        resultSearchVideo: action.findVideo,
        isLoadingVideos: action.isLoading,
      };
    }

    case DeletePrevData.DELETEPREVDATA: {
      return {
        ...state,
        resultSearchVideo: action.data,
      };
    }

    case ToggleMenuTypes.TOGGLEMENU: {
      return {
        ...state,
        isToggleMenu: !state.isToggleMenu,
      };
    }

    case MoveScroll.MOVESCROLL: {
      return {
        ...state,
        isScrolling: action.scrollTop! > 10 ? true : false,
        isScrollTop: action.scrollTop,
        isScrollHeight: action.scrollHeight,
        isClientHeight: action.clientHeight,
      };
    }

    case likeHeart.LIKEHEART: {
      return {
        ...state,
      };
    }

    case preplayVideoTypes.PREPLAYVIDEO: {
      return {
        ...state,
      };
    }

    case pauseVideoTypes.PAUSEVIDEO: {
      return {
        ...state,
      };
    }

    case isLoadingImagesTypes.LOADINGIMAGES: {
      return {
        ...state,
        isLoadingImages: action.isLoading,
      };
    }

    case isLoadingVideosTypes.LOADINGVIDEOS: {
      return {
        ...state,
        isLoadingVideos: action.isLoading,
      };
    }

    case SearchBySuggestedWordTypes.SEARCHBYSUGGESTEDWORD: {
      return {
        ...state,
        searchNameVideo: action.name,
        searchNamePhoto: action.name,
      };
    }

    case DownloadImageTypes.DOWNLOADIMAGE: {
      return {
        ...state,
      };
    }

    case GetIdPhotoTypes.GETIDPHOTO: {
      return {
        ...state,
        modalWindowPhotoPage: {
          ...state.modalWindowPhotoPage,
          id: action.id,
        },
      };
    }
      
    case GetIdVideoTypes.GETIDVIDEO: {
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          id: [action.id],
        }
      };
    }

    case ToggleWindowPhotoPageTypes.TOGGLEWINDOWPHOTOPAGE: {
      return {
        ...state,
        modalWindowPhotoPage: {
          ...state.modalWindowPhotoPage,
          isOpen: !state.modalWindowPhotoPage.isOpen,
        },
      };
    }
      
    case ToggleWindowVideoPageTypes.TOGGLEWINDOWVIDEOPAGE: {
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          isOpen: !state.modalWindowVideoPage.isOpen,
        },
      };
    }

    case ImageForwardTypes.IMAGEFORWARD: {
      if (action.stepForward >= state.data!.photos.length) {
        action.stepForward = 0;
      }

      return {
        ...state,
        modalWindowPhotoPage: {
          ...state.modalWindowPhotoPage,
          id: action.stepForward,
        },
      };
    }

    case ImageBackTypes.IMAGEBACK: {
      if (action.stepBack <= 0) {
        action.stepBack = state.data!.photos.length - 1;
      }

      return {
        ...state,
        modalWindowPhotoPage: {
          ...state.modalWindowPhotoPage,
          id: action.stepBack,
        },
      };
    }

    case ToggleDropMenuPhotoPageTypes.TOGGLEDROPMENUPHOTOPAGE: {
      return {
        ...state,
        modalWindowPhotoPage: {
          ...state.modalWindowPhotoPage,
          isOpenDropDownMenu: !state.modalWindowPhotoPage.isOpenDropDownMenu,
        },
      };
    }

    case SelectImageSizeTypes.SELECTIMAGESIZE: {
      return {
        ...state,
        modalWindowPhotoPage: {
          ...state.modalWindowPhotoPage,
          sizeURL: action.size,
        },
      };
    }

    case DownloadImageSizeTypes.DOWNLOADIMAGESIZE: {
      return {
        ...state,
      };
    }

    case ClearEarlierSizeTypes.CLEAREARLIERSIZE: {
      return {
        ...state,
        modalWindowPhotoPage: {
          ...state.modalWindowPhotoPage,
          sizeURL: action.clear,
        },
      };
    }

    case ClearRadioBoxesTypes.CLEARRADIOBOXES: {
      return {
        ...state,
      };
    }
      
      
    case ToggleBtnMediaPlayerTypes.TOGGLEBTNMEDIAPLAYER: {
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          isPlay:action.isPlay
        },
      };
    }
      
    case StopMediaPlayerTypes.STOPMEDIAPLAYER: {
      clearInterval(state.modalWindowVideoPage.timer);
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          currentTime: action.time
        },
      };
    }

    case StartMediaPlayerTypes.STARTMEDIAPLAYER: {
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          timer: action.timer
        },
      };
    }
      
      
    case SetCurrentTimeTypes.SETCURRENTTIME: {
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          currentTime: action.time
        },
      };
    }
      
      
    case PauseMediaPlayerTypes.PAUSEMEDIAPLAYER: {
      clearInterval(state.modalWindowVideoPage.timer);
      return {
        ...state
      };
    }


      
    default:
      return state;
  }
};
