export enum AccountCreatedTypes {
  ACCOUNTCREATED = "ACCOUNTCREATED",
}

export enum SetUserNameTypes {
  SETUSERNAME = "SETUSERNAME",
}

export enum AccountSignInTypes {
  ACCOUNTSIGNIN = "ACCOUNTSIGNIN",
}

export enum ToggleAccountModalWindowTypes {
  TOGGLEACCOUNTMODALWINDOW = "TOGGLEACCOUNTMODALWINDOW",
}

export enum AccountIdentificationTypes {
  ACCOUNTIDENTIFICATION = "ACCOUNTIDENTIFICATION",
}

export enum DowloadCollectionOfLikesTypes {
  DOWNLOADCOLLECTIONOFLIKES = "DOWNLOADCOLLECTIONOFLIKES",
}

export enum SetUserEmailTypes{
  SETUSEREMAIL="SETUSEREMAIL"
}

/*  interfaces */
export interface ISetUserEmailAction{
  type: SetUserEmailTypes.SETUSEREMAIL;
  value: string;
}

export interface IDowloadCollectionOfLikesAction {
  type: DowloadCollectionOfLikesTypes.DOWNLOADCOLLECTIONOFLIKES;
  collection: any;
}

export interface IAccountIdentificationAction {
  type: AccountIdentificationTypes.ACCOUNTIDENTIFICATION;
  value: string;
}

export interface IToggleAccountModalWindowAction {
  type: ToggleAccountModalWindowTypes.TOGGLEACCOUNTMODALWINDOW;
  value: boolean;
}

export interface IAccountSignInAction {
  type: AccountSignInTypes.ACCOUNTSIGNIN;
  value: boolean;
}

export interface ISetUserNameAction {
  type: SetUserNameTypes.SETUSERNAME;
  name: string;
}

export interface IAccountcreatedAction {
  type: AccountCreatedTypes.ACCOUNTCREATED;
  value: boolean;
}

/* actions */
export type AccountStateActions =
  |ISetUserEmailAction
  | IDowloadCollectionOfLikesAction
  | IAccountIdentificationAction
  | IToggleAccountModalWindowAction
  | IAccountSignInAction
  | ISetUserNameAction
  | IAccountcreatedAction;

/* state  */
export interface IAccountState {
  isAccountCreated: boolean;
  userName: string;
  isAccountSignIn: boolean;
  isAccountModalWindowOpen: boolean;
  identification: string | undefined;
  collection: any[] | null;
  userEmail: string;
}
