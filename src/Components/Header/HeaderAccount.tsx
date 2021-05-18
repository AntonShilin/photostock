import * as React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import { toggleAccountModalWindow } from "../../Actions/AccountActions";
import {
  clearKeyPressNumber,
  getSearchImages,
  getSearchVideos,
  handleSearchChange,
  handleToggleMenu,
} from "../../Actions/ProductsActions";
import { IApplicationState } from "../../Store/Store";
import AccountModalWindow from "../Account/AccountModalWindow/AccountModalWindow";
import Submenu from "../Submenu/Submenu";
import "./HeaderAccount.scss";

export interface IHeaderProps extends RouteComponentProps {
  searchNamePhoto: string | null;
  searchNameVideo: string | null;
  watchInputChange: typeof handleSearchChange;
  getSearchImages: typeof getSearchImages;
  getSearchVideos: typeof getSearchVideos;
  clearKeyPressNumber: typeof clearKeyPressNumber;
  isAccountCreated: boolean;
  isAccountSignIn: boolean;
  handleToggleMenu: typeof handleToggleMenu;
  isAccountModalWindowOpen: boolean;
  toggleAccountModalWindow: typeof toggleAccountModalWindow;
}

export interface IHeaderState {}

class HeaderAccount extends React.Component<IHeaderProps, IHeaderState> {
  public pressEnterKey = () => {
    if (this.props.searchNamePhoto!.trim().length > 0) {
      this.props.getSearchImages(this.props.searchNamePhoto!);
      this.props.getSearchVideos(this.props.searchNamePhoto!);
      this.props.history.push(`/photos/${this.props.searchNamePhoto}`);
      this.props.clearKeyPressNumber();
    }
  };

  public render() {
    const { isAccountCreated, isAccountSignIn, isAccountModalWindowOpen } =
      this.props;

    return (
      <>
        <header className="header_main">
          <div className="container-xl header_bg">
            <div className="row">
              <div className="col-2">
                <NavLink to="/photos" className="btn">
                  F
                </NavLink>
              </div>
              <div className="col-8">
                <form>
                  <div>
                    <input
                      type="text"
                      placeholder="Find a photo"
                      value={this.props.searchNamePhoto!}
                      onChange={(e) => this.props.watchInputChange(e)}
                      autoFocus={false}
                      required={true}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          this.pressEnterKey();
                          e.preventDefault();
                        }
                      }}
                    />
                    <NavLink
                      className="search_btn"
                      to={`/photos/${this.props.searchNamePhoto}`}
                      onClick={() => {
                        this.props.getSearchImages(this.props.searchNamePhoto!);
                        this.props.getSearchVideos(this.props.searchNameVideo!);
                      }}
                    >
                      <FiSearch />
                    </NavLink>
                  </div>
                </form>
              </div>
              <div className="col-2 d-lg-block d-none">
                {isAccountSignIn ? (
                  <NavLink
                    to="#"
                    className="login_circle"
                    onClick={() =>
                      this.props.toggleAccountModalWindow(
                        !isAccountModalWindowOpen
                      )
                    }
                  >
                    <FaRegUserCircle />
                    <MdKeyboardArrowDown />
                  </NavLink>
                ) : (
                  <NavLink to="/login" className="sign_in_dots">
                    <span />
                    <span />
                    <span />
                  </NavLink>
                )}
              </div>
              <button
                className="d-lg-none"
                onClick={this.props.handleToggleMenu}
              >
                <IoIosMenu />
              </button>
            </div>
          </div>
        </header>
        <Submenu />
        <AccountModalWindow />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  searchNamePhoto: state.products.searchNamePhoto,
  searchNameVideo: state.products.searchNameVideo,
  isAccountCreated: state.account.isAccountCreated,
  isAccountSignIn: state.account.isAccountSignIn,
  isAccountModalWindowOpen: state.account.isAccountModalWindowOpen,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    watchInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(handleSearchChange(e)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    clearKeyPressNumber: () => dispatch(clearKeyPressNumber()),
    handleToggleMenu: () => dispatch(handleToggleMenu()),
    toggleAccountModalWindow: (value: boolean) =>
      dispatch(toggleAccountModalWindow(value)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderAccount)
);
