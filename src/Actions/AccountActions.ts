import {
  AccountCreatedTypes,
  AccountIdentificationTypes,
  AccountSignInTypes,
  DowloadCollectionOfLikesTypes,
  IAccountcreatedAction,
  IAccountIdentificationAction,
  IAccountSignInAction,
  IDowloadCollectionOfLikesAction,
  ISetUserNameAction,
  IToggleAccountModalWindowAction,
  SetUserEmailTypes,
  SetUserNameTypes,
  ToggleAccountModalWindowTypes,
} from "./../Types/AccountTypes";

export const accountSignUp = (value: boolean): IAccountcreatedAction => {
  return {
    type: AccountCreatedTypes.ACCOUNTCREATED,
    value,
  };
};

export const setUserName = (name: string): ISetUserNameAction => {
  return {
    type: SetUserNameTypes.SETUSERNAME,
    name,
  };
};

export const accountSignIn = (value: boolean): IAccountSignInAction => {
  return {
    type: AccountSignInTypes.ACCOUNTSIGNIN,
    value,
  };
};

/* open account modal window */
export const toggleAccountModalWindow = (
  value: boolean
): IToggleAccountModalWindowAction => {
  return {
    type: ToggleAccountModalWindowTypes.TOGGLEACCOUNTMODALWINDOW,
    value,
  };
};

/* set account identification value*/
export const setAccountIdentification = (
  value: string
): IAccountIdentificationAction => {
  return {
    type: AccountIdentificationTypes.ACCOUNTIDENTIFICATION,
    value,
  };
};

/* download collection from db */
export const downloadCollectionOfLikes = (
  arr: any
): IDowloadCollectionOfLikesAction => {
  return {
    type: DowloadCollectionOfLikesTypes.DOWNLOADCOLLECTIONOFLIKES,
    collection: arr,
  };
};

/* set user email */
export const setUserEmail = (value: string) => {
  return {
    type: SetUserEmailTypes.SETUSEREMAIL,
    value,
  };
};
