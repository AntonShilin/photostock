export enum AccountCreatedTypes {
  ACCOUNTCREATED = "ACCOUNTCREATED",
}

export enum SetUserNameTypes {
  SETUSERNAME = "SETUSERNAME",
}

export enum AccountSignInTypes {
  ACCOUNTSIGNIN = "ACCOUNTSIGNIN",
}

export enum ToggleAccountModalWindowTypes{
  TOGGLEACCOUNTMODALWINDOW="TOGGLEACCOUNTMODALWINDOW"
}

/*  interfaces */
export interface IToggleAccountModalWindowAction{
  type: ToggleAccountModalWindowTypes.TOGGLEACCOUNTMODALWINDOW;
  value: boolean;
}

export interface IAccountSignInAction {
  type: AccountSignInTypes.ACCOUNTSIGNIN;
  value: boolean;
}

export interface ISetUserNameAction {
  type: SetUserNameTypes.SETUSERNAME;
  name: string|null;
}

export interface IAccountcreatedAction {
  type: AccountCreatedTypes.ACCOUNTCREATED;
  value: boolean;
}

/* actions */
export type AccountStateActions =
  |IToggleAccountModalWindowAction
  | IAccountSignInAction
  | ISetUserNameAction
  | IAccountcreatedAction;

/* state  */
export interface IAccountState {
  isAccountCreated: boolean;
  userName: string | null;
  isAccountSignIn: boolean;
  isAccountModalWindowOpen: boolean;
}
