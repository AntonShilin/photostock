export enum ToggleModalWindowTypes {
  TOGGLEMODALWINDOW = "TOGGLEMODALWINDOW",
}

/* interfaces */
export interface IToggleModalWindowAction {
  type: ToggleModalWindowTypes.TOGGLEMODALWINDOW;
  value: boolean;
  elem: any | null;
}

/* actions */
export type ModalWindowStateActions = IToggleModalWindowAction;

/* state  */
export interface IModalWindowState {
  isModalWindowOpen: boolean;
  data: any | null;
}
