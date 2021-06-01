import {
  IModalWindowState,
  ModalWindowStateActions,
  ToggleModalWindowTypes,
} from "../Types/ModalWindowTypes";

const modalWindowState: IModalWindowState = {
  isModalWindowOpen: false,
  data: null
};

export const modalWindowReducer = (
  state: IModalWindowState = modalWindowState,
  action: ModalWindowStateActions
): IModalWindowState => {
  switch (action.type) {
    case ToggleModalWindowTypes.TOGGLEMODALWINDOW: {
      return {
        ...state,
        isModalWindowOpen: !state.isModalWindowOpen,
        data: action.elem
      };
    }

    default:
      return state;
  }
};
