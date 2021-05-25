import {
  AccountIdentificationTypes,
  AccountSignInTypes,
  DowloadCollectionOfLikesTypes,
  SetUserEmailTypes,
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
  userName: "",
  isAccountSignIn: false,
  isAccountModalWindowOpen: false,
  identification: undefined,
  collection: null,
  userEmail: "",
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

    case DowloadCollectionOfLikesTypes.DOWNLOADCOLLECTIONOFLIKES: {
      return {
        ...state,
        collection: action.collection,
      };
    }

    case SetUserEmailTypes.SETUSEREMAIL: {
      return {
        ...state,
        userEmail: action.value,
      };
    }

    default:
      return state;
  }
};
