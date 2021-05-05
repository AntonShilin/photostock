import * as React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

export interface Props {}

export interface State {}

class Footer extends React.Component<Props, State> {
  public render() {
    return (
      <footer className="container-xl">
        <div className="container-xl">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <NavLink to="/" className="footer_logo btn">
                F
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3">
              <NavLink to="#">Terms of Use</NavLink>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3">
              <NavLink to="#">Privacy Policy</NavLink>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3">
              <NavLink to="#">License</NavLink>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3">
              <NavLink to="#">Imprint</NavLink>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
