import * as React from "react";
import { AiFillPicture } from "react-icons/ai";
import { FaRegUserCircle, FaVideo } from "react-icons/fa";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { handleToggleMenu } from "../../Actions/ProductsActions";
import { IApplicationState } from "../../Store/Store";
import "./Submenu.scss";
import { MdClose } from "react-icons/md";

export interface ISubmenuProps {
  handleToggleMenu: typeof handleToggleMenu;
  isToggleMenu: boolean;
}

export interface State {}

class Submenu extends React.Component<ISubmenuProps, State> {
  public render() {
    return (
      <div
        id="submenu_bg"
        className={`container-xl d-lg-none`}
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
        <div className="row align-items-center">
          <div className="col-12 text-center">
            <NavLink
              to="/photos"
              className=" text-decoration-none"
              onClick={this.props.handleToggleMenu}
            >
              <AiFillPicture /> Photos
            </NavLink>
          </div>
          <div className="col-12 text-center">
            <NavLink
              to="/videos"
              className=" text-decoration-none"
              onClick={this.props.handleToggleMenu}
            >
              <FaVideo /> Videos
            </NavLink>
          </div>
          <div className="col-12 text-center">
            <NavLink to="/login" onClick={this.props.handleToggleMenu}>
              <FaRegUserCircle /> Sign In
            </NavLink>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  isToggleMenu: state.products.isToggleMenu,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleToggleMenu: () => dispatch(handleToggleMenu()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Submenu);
