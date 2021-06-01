export enum ToggleModalWindowTypes {
  TOGGLEMODALWINDOW = "TOGGLEMODALWINDOW",
}

export enum viewNextTypes {
  VIEWNEXT = "VIEWNEXT",
}

export enum viewPreviouslyTypes {
  VIEWPREVIOUSLY = "VIEWPREVIOUSLY",
}

/* interfaces */
export interface IViewPreviouslyAction {
  type: viewPreviouslyTypes.VIEWPREVIOUSLY;
}

export interface IViewNextAction {
  type: viewNextTypes.VIEWNEXT;
}

export interface IToggleModalWindowAction {
  type: ToggleModalWindowTypes.TOGGLEMODALWINDOW;
  value: boolean;
  id: number;
  collection: any[] | null;
}

/* actions */
export type ModalWindowStateActions =
  | IToggleModalWindowAction
  | IViewPreviouslyAction
  | IViewNextAction;

/* state  */
export interface IModalWindowState {
  isModalWindowOpen: boolean;
  viewedId: number;
  collection: any[] | null;
}
