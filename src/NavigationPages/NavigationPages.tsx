import * as React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationPages.scss";

export interface INavigationPagesProps {}

export interface State {}

class NavigationPages extends React.Component<INavigationPagesProps, State> {
  public render() {
    return (
      <div className="navigation-pages container-xl">
        <div className="row align-items-center">
          <div className="col-6 text-center">
            <NavLink to="/photos" className="p-2 text-decoration-none">
              Photos
            </NavLink>
          </div>
          <div className="col-6 text-center">
            <NavLink to="/videos" className="p-2 text-decoration-none">
              Videos
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default NavigationPages;
