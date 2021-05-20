import {
  AccountIdentificationTypes,
  AccountSignInTypes,
  SetUserNameTypes,
  ToggleAccountModalWindowTypes,
} from "./../Types/AccountTypes";
import {
  AccountCreatedTypes,
  AccountStateActions,
  IAccountState,
} from "../Types/AccountTypes";

const accountState: IAccountState = {
  isAccountCreated: false,
  userName: null,
  isAccountSignIn: false,
  isAccountModalWindowOpen: false,
  identification: null,
};

export const accountReducer = (
  state: IAccountState = accountState,
  action: AccountStateActions
): IAccountState => {
  switch (action.type) {
    case AccountCreatedTypes.ACCOUNTCREATED: {
      return {
        ...state,
        isAccountCreated: action.value,
      };
    }

    case SetUserNameTypes.SETUSERNAME: {
      return {
        ...state,
        userName: action.name,
      };
    }

    case AccountSignInTypes.ACCOUNTSIGNIN: {
      return {
        ...state,
        isAccountSignIn: action.value,
      };
    }

    case ToggleAccountModalWindowTypes.TOGGLEACCOUNTMODALWINDOW: {
      return {
        ...state,
        isAccountModalWindowOpen: action.value,
      };
    }

    case AccountIdentificationTypes.ACCOUNTIDENTIFICATION: {
      return {
        ...state,
        identification: action.value,
      };
    }

    default:
      return state;
  }
};
