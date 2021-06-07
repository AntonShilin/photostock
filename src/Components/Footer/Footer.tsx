import * as React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";


class Footer extends React.Component<{}, {}> {
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

export default Footer;
