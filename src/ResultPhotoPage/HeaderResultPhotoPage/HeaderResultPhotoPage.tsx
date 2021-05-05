import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import "./HeaderResultPhotoPage.scss";
import { connect } from "react-redux";
import { handleToggleMenu, handleScroll } from "../../Actions/ProductsActions";
import { IApplicationState } from "../../Store/Store";
import SearchFotoSmallArea from "../../Components/SearchFotoSmallArea/SearchFotoSmallArea";
import Submenu from "../../Components/Submenu/Submenu";

export interface IHeaderResultPhotoPageProps {
  handleToggleMenu: typeof handleToggleMenu;
  isToggleMenu: boolean;
  handleScroll: typeof handleScroll;
  isScrolling: boolean;
}

class HeaderResultPhotoPage extends React.Component<
  IHeaderResultPhotoPageProps,
  RouteComponentProps
> {
  public componentDidMount() {
    window.addEventListener("scroll", this.props.handleScroll);
  }

  public render() {
    return (
      <>
        <header className="main_item_result_photo_page">
          <div
            style={
              this.props.isToggleMenu
                ? { display: "block" }
                : { display: "none" }
            }
            onClick={this.props.handleToggleMenu}
          />
          <div className="container-xl navigation_result_video_page">
            <div className="row align-items-center">
              <div className="col-2">
                <NavLink to="/photos" className="p-2 text-decoration-none btn">
                  F
                </NavLink>
              </div>
              <div className="col-8">
                <SearchFotoSmallArea />
              </div>
              <div className="col-2 text-center  d-lg-block d-none ">
                <NavLink to="/login" className="p-2 text-decoration-none">
                  <FaRegUserCircle style={{ fontSize: "1.5rem" }} />
                </NavLink>
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
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  isToggleMenu: state.products.isToggleMenu,
  isScrolling: state.products.isScrolling,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleToggleMenu: () => dispatch(handleToggleMenu()),
    handleScroll: (event: any) => dispatch(handleScroll(event)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderResultPhotoPage)
);
