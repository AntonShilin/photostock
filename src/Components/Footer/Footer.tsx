import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { IApplicationState } from "../../Store/Store";
import "./Footer.scss";

export interface IFooterProps {}

export interface IFooterState {}

class Footer extends React.Component<IFooterProps, IFooterState> {
  public render() {
    return (
      <footer className="container-xl">
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <NavLink to="/" className="footer_logo btn">
                F
              </NavLink>
               — Beautiful free photos contributed by our talented community.
            </div>
            <div className="col-12">
              <NavLink to="#">Terms of Use</NavLink>
            </div>
            <div className="col-12">
              <NavLink to="#">Privacy Policy</NavLink>
            </div>
            <div className="col-12">
              <NavLink to="#">License</NavLink>
            </div>
            <div className="col-12">
              <NavLink to="#">Imprint</NavLink>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
