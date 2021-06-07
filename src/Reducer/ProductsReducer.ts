import {
  ClearPhotoIdTypes,
  ClearVideoIDTypes,
  isLoadingPopularImagesTypes,
  isLoadingPopularVideosTypes,
  isLoadingSearchImagesByNameTypes,
  isLoadingSearchVideosByNameTypes,
  PopularImageBackTypes,
  PopularImageForwardTypes,
  PopularVideoBackTypes,
} from "./../Types/ProductsTypes";
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
  VideoForwardTypes,
  VideoBackTypes,
  SelectVideoSizeTypes,
  ToggleDropMenuVideoPageTypes,
  ClearKeyPressNumberTypes,
  PopularVideoForwardTypes,
} from "../Types/ProductsTypes";
import { IData, IVideos } from "../Interfaces/Interfaces";

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
  isLoadingPopularImages: false,
  isLoadingPopularVideos: false,
  isLoadingSearchImagesByName: false,
  isLoadingSearchVideosByName: false,
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
    id: 0,
    isOpen: false,
    isOpenDropDownMenu: false,
    sizeURL: undefined,
    sizeVideoURL: undefined,
  },
};

export const productsReducer = (
  state: IProductsState = initialProductState,
  action: ProductsActions
): IProductsState => {
  switch (action.type) {
    case GetPopularImagesTypes.GETPOPULARIMAGES: {
      action.popularPhoto.photos.map((elem: IData, i: number) => {
        elem.id = i;
      });
      return {
        ...state,
        data: action.popularPhoto,
        isLoadingPopularImages: action.isLoading,
      };
    }

    case isLoadingPopularImagesTypes.ISLOADINGPOPULARIMAGES: {
      return {
        ...state,
        isLoadingPopularImages: action.isLoading,
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

    case isLoadingSearchImagesByNameTypes.ISLOADINGSEARCHIMAGESBYNAME: {
      return {
        ...state,
        isLoadingSearchImagesByName: action.isLoading,
      };
    }

    case SearchImagesByNameTypes.SEARCHIMAGESBYNAME: {
      action.findPhoto.photos.map((elem: IData, i: number) => {
        elem.id = i;
      });
      return {
        ...state,
        resultSearchImage: action.findPhoto,
        isLoadingSearchImagesByName: action.isLoading,
      };
    }

    case isLoadingPopularVideosTypes.ISLOADINGPOPULARVIDEOS: {
      return {
        ...state,
        isLoadingPopularVideos: action.isLoading,
      };
    }

    case GetPopularVideoTypes.GETPOPULARVIDEO: {
      action.popularVideo.videos.map((elem: IVideos, i: number) => {
        elem.id = i;
      });
      return {
        ...state,
        videos: action.popularVideo,
        isLoadingPopularVideos: action.isLoading,
      };
    }

    case GetChangeNameVideoTypes.GETCHANGENAMEVIDEO: {
      return {
        ...state,
        searchNameVideo: action.value,
        searchNamePhoto: action.value,
      };
    }
      
    case isLoadingSearchVideosByNameTypes.ISLOADINGSEARCHVIDEOSBYNAME: {
      return {
        ...state,
        isLoadingSearchVideosByName: action.isLoading,
      };
    }


    case GetVideoTypes.GETVIDEO: {
      action.findVideo.videos.map((elem: IVideos, i: number) => {
        elem.id = i;
      });
      return {
        ...state,
        resultSearchVideo: action.findVideo,
        isLoadingSearchVideosByName: action.isLoading,
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
          id: action.id,
        },
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
      if (action.stepForward >= state.resultSearchImage!.photos.length) {
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
        action.stepBack = state.resultSearchImage!.photos.length - 1;
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

    case ToggleDropMenuVideoPageTypes.TOGGLEDROPMENUVIDEOPAGE: {
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          isOpenDropDownMenu: !state.modalWindowVideoPage.isOpenDropDownMenu,
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

    case VideoForwardTypes.VIDEOFORWARD: {
      if (action.stepForward >= state.resultSearchVideo!.videos.length) {
        action.stepForward = 0;
      }
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          id: action.stepForward,
        },
      };
    }

    case VideoBackTypes.VIDEOBACK: {
      if (action.stepBack <= 0) {
        action.stepBack = state.resultSearchVideo!.videos.length - 1;
      }
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          id: action.stepBack,
        },
      };
    }

    case SelectVideoSizeTypes.SELECTVIDEOSIZE: {
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          sizeVideoURL: action.size,
        },
      };
    }

    case ClearKeyPressNumberTypes.CLEARKEYPRESSNUMBER: {
      return {
        ...state,
        keyboardKey: action.keyPressNumber,
      };
    }

    case PopularVideoForwardTypes.POPULARVIDEOFORWARD: {
      if (action.stepForward >= state.videos!.videos.length) {
        action.stepForward = 0;
      }
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          id: action.stepForward,
        },
      };
    }

    case PopularVideoBackTypes.POPULARVIDEOBACK: {
      if (action.stepBack <= 0) {
        action.stepBack = state.videos!.videos.length - 1;
      }
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          id: action.stepBack,
        },
      };
    }

    case ClearVideoIDTypes.CLEARVIDEOID: {
      return {
        ...state,
        modalWindowVideoPage: {
          ...state.modalWindowVideoPage,
          id: action.pos,
        },
      };
    }

    case ClearPhotoIdTypes.CLEARPHOTOID: {
      return {
        ...state,
        modalWindowPhotoPage: {
          ...state.modalWindowPhotoPage,
          id: action.pos,
        },
      };
    }

    case PopularImageForwardTypes.POPULARIMAGEFORWARD: {
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

    case PopularImageBackTypes.POPULARIMAGEBACK: {
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

    default:
      return state;
  }
};
