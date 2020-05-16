import * as React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationPages.scss";

export interface INavigationPagesProps {}

export interface State {}

class NavigationPages extends React.Component<INavigationPagesProps, State> {
  public render() {
    return (
      <div className="navigation-pages container-xl">
        <div className="row align-items-center justify-content-center">
          <div className="col-3 text-center">
            <NavLink to="/photos"  activeClassName="active">
              Photos
            </NavLink>
          </div>
          <div className="col-3 text-center">
            <NavLink to="/videos" activeClassName="active">
              Videos
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default NavigationPages;
