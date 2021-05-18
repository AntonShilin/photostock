import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import "./HeaderResultVideoPage.scss";
import { connect } from "react-redux";
import { handleToggleMenu, handleScroll } from "../../Actions/ProductsActions";
import { IApplicationState } from "../../Store/Store";
import SearchVideoSmallArea from "../../Components/SearchVideoSmallArea/SearchVideoSmallArea";
import Submenu from "../../Components/Submenu/Submenu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toggleAccountModalWindow } from "../../Actions/AccountActions";
import AccountModalWindow from "../../Components/Account/AccountModalWindow/AccountModalWindow";

export interface IHeaderResultVideoPageProps {
  handleToggleMenu: typeof handleToggleMenu;
  isToggleMenu: boolean;
  handleScroll: typeof handleScroll;
  isScrolling: boolean;
  isAccountSignIn: boolean;
  isAccountModalWindowOpen: boolean;
  toggleAccountModalWindow: typeof toggleAccountModalWindow;
}

class HeaderResultVideoPage extends React.Component<
  IHeaderResultVideoPageProps,
  RouteComponentProps
> {
  public componentDidMount() {
    window.addEventListener("scroll", this.props.handleScroll);
  }

  public render() {
    const { isAccountSignIn, isAccountModalWindowOpen } = this.props;
    return (
      <>
        <header className="main_item_result_video_page">
          <div
            style={
              this.props.isToggleMenu
                ? { display: "block" }
                : { display: "none" }
            }
            onClick={this.props.handleToggleMenu}
          />
          <div className="container-xl navigation_result_video_page">
            <div className="row">
              <div className="col-2">
                <NavLink to="/videos" className="btn">
                  F
                </NavLink>
              </div>
              <div className="col-8">
                <SearchVideoSmallArea />
              </div>
              <div className="col-2 d-lg-block d-none">
                {isAccountSignIn ? (
                  <NavLink
                    to="#"
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
                  <NavLink to="/login">
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
  isToggleMenu: state.products.isToggleMenu,
  isScrolling: state.products.isScrolling,
  isAccountSignIn: state.account.isAccountSignIn,
  isAccountModalWindowOpen: state.account.isAccountModalWindowOpen,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleToggleMenu: () => dispatch(handleToggleMenu()),
    handleScroll: (event: any) => dispatch(handleScroll(event)),
    toggleAccountModalWindow: (value: boolean) =>
      dispatch(toggleAccountModalWindow(value)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderResultVideoPage)
);
