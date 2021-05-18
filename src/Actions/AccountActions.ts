import {
  AccountSignInTypes,
  IAccountcreatedAction,
  IAccountSignInAction,
  ISetUserNameAction,
  IToggleAccountModalWindowAction,
  SetUserNameTypes,
  ToggleAccountModalWindowTypes,
} from "./../Types/AccountTypes";
import { AccountCreatedTypes } from "../Types/AccountTypes";

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
