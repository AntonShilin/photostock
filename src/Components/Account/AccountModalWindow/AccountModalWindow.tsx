import firebase from "firebase";
import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  accountSignIn,
  setUserName,
  toggleAccountModalWindow,
} from "../../../Actions/AccountActions";
import { IApplicationState } from "../../../Store/Store";
import "./AccountModalWindow.scss";

export interface IAccountModalWindowProps {
  isAccountModalWindowOpen: boolean;
  setUserName: typeof setUserName;
  accountSignIn: typeof accountSignIn;
  toggleAccountModalWindow: typeof toggleAccountModalWindow;
}

export interface IAccountModalWindowPropsState {}

class AccountModalWindow extends React.Component<
  IAccountModalWindowProps,
  IAccountModalWindowPropsState
> {
  public signOut = () => {
    const { isAccountModalWindowOpen } = this.props;
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          this.props.setUserName(null);
          this.props.accountSignIn(false);
          this.props.toggleAccountModalWindow(!isAccountModalWindowOpen);
        },
        (error) => {
          console.error("Sign Out Error", error);
        }
      );
  };

  public render() {
    const { isAccountModalWindowOpen } = this.props;

    return (
      isAccountModalWindowOpen && (
        <div className="account_window_bg d-lg-block d-none">
          <NavLink
            to="/my-account"
            onClick={() =>
              this.props.toggleAccountModalWindow(!isAccountModalWindowOpen)
            }
          >
            Your profile
          </NavLink>
          <NavLink to="/edit-profile">Settings</NavLink>
          <NavLink to="#" onClick={this.signOut}>
            Logout
          </NavLink>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  isAccountModalWindowOpen: state.account.isAccountModalWindowOpen,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserName: (name: string | null) => dispatch(setUserName(name)),
    accountSignIn: (value: boolean) => dispatch(accountSignIn(value)),
    toggleAccountModalWindow: (value: boolean) =>
      dispatch(toggleAccountModalWindow(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountModalWindow);
