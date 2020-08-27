import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import "./HeaderVideoPage.scss";
import { connect } from "react-redux";
import { handleToggleMenu, handleScroll } from "../../Actions/ProductsActions";
import { IApplicationState } from "../../Store/Store";
import SearchVideoSmallArea from "../../Components/SearchVideoSmallArea/SearchVideoSmallArea";

export interface IHeaderVideoPageProps {
  handleToggleMenu: typeof handleToggleMenu;
  isToggleMenu: boolean;
  handleScroll: typeof handleScroll;
  isScrolling: boolean;
  isScrollTop: number| null;
}

class HeaderVideoPage extends React.Component<IHeaderVideoPageProps> {
  public componentDidMount() {
    window.addEventListener("scroll", this.props.handleScroll);
  }

  public render() {
    return (
      <header className="main_item_video_page">
        <div
          style={
            this.props.isToggleMenu ? { display: "block" } : { display: "none" }
          }
          onClick={() => this.props.handleToggleMenu()}
        />
        <div
          className="container-fluid navigation_video_page"
          style={
            this.props.isScrolling
              ? { backgroundColor: "#232a34ed" }
              : { backgroundColor: "transparent" }
          }
        >
          <div className="row align-items-center">
            <div className="col-2">
              <NavLink to="/photos" className="text-decoration-none btn">
                F
              </NavLink>
            </div>
            <div className="col-8">
              {this.props.isScrollTop!>380 && <SearchVideoSmallArea /> }
            </div>
            <div className="col-2 text-center  d-lg-block d-none ">
              <NavLink to="/login" className="p-2 text-decoration-none">
                <FaRegUserCircle style={{ fontSize: "1.5rem" }} />
              </NavLink>
            </div>

            <button
              className="d-lg-none"
              onClick={() => this.props.handleToggleMenu()}
            >
              {!this.props.isToggleMenu ? (
                <IoIosMenu />
              ) : (
                <MdClose
                  style={{ fontSize: "2rem", color: "white", strokeWidth: "1" }}
                />
              )}
            </button>
          </div>
          <div
            id="video_page_submenu"
            className={`container-xl d-lg-none`}
            style={
              this.props.isToggleMenu
                ? { display: "block" }
                : { display: "none", width: "0%" }
            }
          >
            <div className="row align-items-center">
              <div className="col-12 text-center">
                <NavLink to="/photos" className=" text-decoration-none">
                  <AiFillPicture /> Photos
                </NavLink>
              </div>
              <div className="col-12 text-center">
                <NavLink to="/videos" className=" text-decoration-none">
                  <FaVideo/> Videos
                </NavLink>
              </div>
              <div className="col-12 text-center">
                <NavLink to="/login" className="">
                  <FaRegUserCircle/> Sign In
                </NavLink>
              </div>
            </div>
            <div />
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  isToggleMenu: state.products.isToggleMenu,
  isScrolling: state.products.isScrolling,
  isScrollTop: state.products.isScrollTop,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleToggleMenu: () => dispatch(handleToggleMenu()),
    handleScroll: (event: any) => dispatch(handleScroll(event)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HeaderVideoPage)
);
