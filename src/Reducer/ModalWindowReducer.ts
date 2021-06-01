import {
  IModalWindowState,
  ModalWindowStateActions,
  ToggleModalWindowTypes,
  viewNextTypes,
  viewPreviouslyTypes,
} from "../Types/ModalWindowTypes";

const modalWindowState: IModalWindowState = {
  isModalWindowOpen: false,
  viewedId: 0,
  collection: null,
};

export const modalWindowReducer = (
  state: IModalWindowState = modalWindowState,
  action: ModalWindowStateActions
): IModalWindowState => {
  switch (action.type) {
    case ToggleModalWindowTypes.TOGGLEMODALWINDOW: {
      return {
        ...state,
        isModalWindowOpen: action.value,
        viewedId: action.id,
        collection: action.collection,
      };
    }

    case viewPreviouslyTypes.VIEWPREVIOUSLY: {
      let prevId: number = state.viewedId - 1;
      if (prevId < 0) {
        prevId = state.collection!.length-1;
      }
      return {
        ...state,
        viewedId: prevId,
      };
    }

    case viewNextTypes.VIEWNEXT: {
      let nextId: number = state.viewedId + 1;
      if (nextId > state.collection!.length - 1) {
        nextId = 0;
      }
      return {
        ...state,
        viewedId: nextId,
      };
    }

    default:
      return state;
  }
};
