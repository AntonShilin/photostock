import {
  AccountCreatedTypes,
  AccountIdentificationTypes,
  AccountSignInTypes,
  IAccountcreatedAction,
  IAccountIdentificationAction,
  IAccountSignInAction,
  ISetUserNameAction,
  IToggleAccountModalWindowAction,
  SetUserNameTypes,
  ToggleAccountModalWindowTypes,
} from "./../Types/AccountTypes";

export const accountSignUp = (value: boolean): IAccountcreatedAction => {
  return {
    type: AccountCreatedTypes.ACCOUNTCREATED,
    value,
  };
};

export const setUserName = (name: string | null): ISetUserNameAction => {
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
