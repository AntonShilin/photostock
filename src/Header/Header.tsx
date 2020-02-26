import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import "url-search-params-polyfill";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import "./Header.scss";
import { connect } from "react-redux";
import { handleToggleMenu, handleScroll } from "../Actions/ProductsActions";
import { IApplicationState } from "../Store/Store";
import SearchSmall from "../SearchSmall/SearchSmall";

export interface IHeaderProps {
  handleToggleMenu: typeof handleToggleMenu;
  isToggleMenu: boolean;
  handleScroll: typeof handleScroll;
  isScrolling: boolean;
}

class Header extends React.Component<IHeaderProps, RouteComponentProps> {
  public elementMenu: React.RefObject<HTMLDivElement>;
  constructor(props: IHeaderProps) {
    super(props);
    this.elementMenu = React.createRef();
  }

  public componentDidMount() {
    window.addEventListener("scroll", this.props.handleScroll);
  }

  public render() {
    return (
      <React.Fragment>
        <div
          className={`streak d-lg-none ${
            this.props.isScrolling ? "d-none" : ""
          }`}
          style={
            this.props.isToggleMenu ? { display: "block" } : { display: "none" }
          }
        />
        <div id="main_menu" className="container-xl">
          <div className="row align-items-center">
            <div className="col-lg-3 d-flex">
              <NavLink to="#" className="p-2 text-decoration-none">
                F&S
              </NavLink>
              {this.props.isToggleMenu ? <SearchSmall /> : null}
            </div>
            <div className="col-lg-3 text-right  d-lg-block d-none">
              <NavLink to="/photos" className="p-2 text-decoration-none">
                Find photos
              </NavLink>
            </div>
            <div className="col-lg-3 text-right  d-lg-block d-none">
              <NavLink to="/videos" className="p-2 text-decoration-none">
                Find videos
              </NavLink>
            </div>
            <div className="col-lg-3 text-right  d-lg-block d-none ">
              <NavLink to="/login" className="p-2">
                <FaRegUserCircle style={{ fontSize: "1.5rem" }} />
              </NavLink>
            </div>

            <button
              className="d-lg-none"
              onClick={() => this.props.handleToggleMenu(this.elementMenu)}
            >
              {!this.props.isToggleMenu ? (
                <IoIosMenu style={{ fontSize: "2rem", color: "white" }} />
              ) : (
                <MdClose style={{ fontSize: "2rem", color: "white" }} />
              )}
            </button>
          </div>
        </div>
        <div
          ref={this.elementMenu}
          id="main_menu_submenu"
          className={`container-xl d-lg-none ${
            this.props.isScrolling ? "d-none" : ""
          }`}
          style={
            this.props.isToggleMenu
              ? { display: "block" }
              : { display: "none", width: "0%" }
          }
        >
          <div className="row align-items-center">
            <div className="col-12 text-center mb-4 mt-4">
              <NavLink to="/photos" className=" text-decoration-none">
                Find photos
              </NavLink>
            </div>
            <div className="col-12 text-center mb-4">
              <NavLink to="/videos" className=" text-decoration-none">
                Find videos
              </NavLink>
            </div>
            <div className="col-12 text-center mb-4">
              <NavLink to="/login" className="">
                <FaRegUserCircle style={{ fontSize: "1.5rem" }} />
              </NavLink>
            </div>
          </div>
          <div />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => ({
  isToggleMenu: store.products.isToggleMenu,
  isScrolling: store.products.isScrolling
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleToggleMenu: (element: React.ElementType<HTMLDivElement>) =>
      dispatch(handleToggleMenu(element)),
    handleScroll: (event: any) => dispatch(handleScroll(event))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
