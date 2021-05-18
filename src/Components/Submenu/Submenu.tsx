import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleToggleMenu } from "../../Actions/ProductsActions";
import { IApplicationState } from "../../Store/Store";
import "./Submenu.scss";
import { MdClose } from "react-icons/md";
import firebase from "firebase";
import { accountSignIn, setUserName } from "../../Actions/AccountActions";

export interface ISubmenuProps {
  handleToggleMenu: typeof handleToggleMenu;
  isToggleMenu: boolean;
  isAccountSignIn: boolean;
  setUserName: typeof setUserName;
  accountSignIn: typeof accountSignIn;
}

export interface State {}

class Submenu extends React.Component<ISubmenuProps, State> {
  public signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          this.props.setUserName(null);
          this.props.accountSignIn(false);
          this.props.handleToggleMenu();
        },
        (error) => {
          console.error("Sign Out Error", error);
        }
      );
  };

  public render() {
    const { isAccountSignIn } = this.props;

    return (
      <div
        id="submenu_bg"
        className="d-lg-none"
        style={
          this.props.isToggleMenu
            ? { display: "block" }
            : { display: "none", width: "0%" }
        }
      >
        <MdClose
          className="btn_submenu"
          onClick={this.props.handleToggleMenu}
        />
        <NavLink to="#" className="submenu_logo btn">
          F
        </NavLink>
        <div className="submenu_home">
          <NavLink to="/photos" onClick={this.props.handleToggleMenu}>
            Home
          </NavLink>
        </div>
        <div className="submenu_list">
          <NavLink to="/photos" onClick={this.props.handleToggleMenu}>
            Photos
          </NavLink>
          <NavLink to="/videos" onClick={this.props.handleToggleMenu}>
            Videos
          </NavLink>
        </div>
        <div className="submenu_account_area">
          {isAccountSignIn ? (
            <>
              <NavLink to="/my-account" onClick={this.props.handleToggleMenu}>
                Your profile
              </NavLink>
              <NavLink to="#" onClick={this.props.handleToggleMenu}>
                Setting
              </NavLink>
              <NavLink to="#" onClick={this.signOut}>
                Logout
              </NavLink>
            </>
          ) : (
            <NavLink to="/sign-up" onClick={this.props.handleToggleMenu}>
              Sign Up
            </NavLink>
          )}
        </div>
        <div />
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  isToggleMenu: state.products.isToggleMenu,
  isAccountSignIn: state.account.isAccountSignIn,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleToggleMenu: () => dispatch(handleToggleMenu()),
    setUserName: (name: string | null) => dispatch(setUserName(name)),
    accountSignIn: (value: boolean) => dispatch(accountSignIn(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Submenu);
