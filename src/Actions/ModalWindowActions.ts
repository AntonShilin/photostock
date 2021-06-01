import {
  IToggleModalWindowAction,
  IViewNextAction,
  IViewPreviouslyAction,
  ToggleModalWindowTypes,
  viewNextTypes,
  viewPreviouslyTypes,
} from "../Types/ModalWindowTypes";

/* toggle auth modal window */
export const toggleModalWindow = (
  value: boolean,
  id: number,
  collection: any[] | null
): IToggleModalWindowAction => {
  return {
    type: ToggleModalWindowTypes.TOGGLEMODALWINDOW,
    value,
    id,
    collection
  };
};

export const viewNext = (): IViewNextAction => {
  return {
    type: viewNextTypes.VIEWNEXT,
  };
};

export const viewPreviously = (): IViewPreviouslyAction => {
  return {
    type: viewPreviouslyTypes.VIEWPREVIOUSLY,
  };
};
