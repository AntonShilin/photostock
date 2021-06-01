import {
  IToggleModalWindowAction,
  ToggleModalWindowTypes,
} from "../Types/ModalWindowTypes";

/* toggle auth modal window */
export const toggleModalWindow = (
  value: boolean,
  elem: any
): IToggleModalWindowAction => {
  return {
    type: ToggleModalWindowTypes.TOGGLEMODALWINDOW,
    value,
    elem,
  };
};
