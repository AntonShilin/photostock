import * as React from "react";
import { NavLink } from "react-router-dom";
import "./CouldnotFindPhoto.scss";

export interface Props {}

export interface State {}

class CouldnotFindPhoto extends React.Component<Props, State> {
  public render() {
    return (
      <div className="row could_not_find_photo_item">
        <div className="col-12">
          <h2 className="text-center mb-5">We Couldn't Find Anything</h2>
        </div>
        <div className="col-12">
          <p className="text-left">
            Try spelling the word correctly
          </p>
          <p className="text-left">
            Discover beautiful photos on{" "}
            <NavLink to="/photos">the main page »</NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default CouldnotFindPhoto;
