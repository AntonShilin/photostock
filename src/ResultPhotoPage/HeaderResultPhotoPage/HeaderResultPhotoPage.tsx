import * as React from "react";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import { FaVideo } from "react-icons/fa";
import "./HeaderResultPhotoPage.scss";
import { connect } from "react-redux";
import { handleToggleMenu, handleScroll } from "../../Actions/ProductsActions";
import { IApplicationState } from "../../Store/Store";
import SearchFotoSmallArea from "../../Components/SearchFotoSmallArea/SearchFotoSmallArea";

export interface IHeaderResultPhotoPageProps {
  handleToggleMenu: typeof handleToggleMenu;
  isToggleMenu: boolean;
  handleScroll: typeof handleScroll;
  isScrolling: boolean;
}

class HeaderResultPhotoPage extends React.Component<IHeaderResultPhotoPageProps, RouteComponentProps> {
  public elementMenu: React.RefObject<HTMLDivElement>;
  constructor(props: IHeaderResultPhotoPageProps) {
    super(props);
    this.elementMenu = React.createRef();
  }

  public componentDidMount() {
    window.addEventListener("scroll", this.props.handleScroll);
  }

  public render() {
    return (
      <header className="main_item_result_photo_page">
        <div
          style={
            this.props.isToggleMenu ? { display: "block" } : { display: "none" }
          }
          onClick={() => this.props.handleToggleMenu(this.elementMenu)}
        />
        <div className="container-fluid navigation_result_video_page">
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
              onClick={() => this.props.handleToggleMenu(this.elementMenu)}
            >
              {!this.props.isToggleMenu ? (
                <IoIosMenu style={{ fontSize: "2rem", color: "white",strokeWidth:"20"  }} />
              ) : (
                <MdClose style={{ fontSize: "2rem", color: "white",strokeWidth:"2"  }} />
              )}
            </button>
          </div>
        <div
          ref={this.elementMenu}
          id="result_photo_page_submenu"
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
                <AiFillPicture style={{ fontSize: "1.5rem" }} /> Photos
              </NavLink>
            </div>
            <div className="col-12 text-center">
              <NavLink to="/videos" className=" text-decoration-none">
                <FaVideo style={{ fontSize: "1.5rem" }} /> Videos
              </NavLink>
            </div>
            <div className="col-12 text-center">
              <NavLink to="/login" className="">
                <FaRegUserCircle style={{ fontSize: "1.5rem" }} /> Sign In
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
  isScrolling: state.products.isScrolling
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleToggleMenu: (element: React.ElementType<HTMLDivElement>) =>
      dispatch(handleToggleMenu(element)),
    handleScroll: (event:any) => dispatch(handleScroll(event))
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderResultPhotoPage));
