import * as React from "react";
import { NavLink } from "react-router-dom";
import "./CouldnotFindVideo.scss";

export interface CouldnotFindVideoProps {}

export interface State {}

class CouldnotFindVideo extends React.Component<CouldnotFindVideoProps, State> {
  public render() {
    return (
      <div className="row could_not_find_video_item">
        <div className="col-12">
          <h2 className="text-center mb-5">We Couldn't Find Anything</h2>
        </div>
        <div className="col-12">
          <p className="text-left">
          Try spelling the word correctly
          </p>
          <p className="text-left">
            Discover beautiful videos on{" "}
            <NavLink to="/videos">the main page »</NavLink>
          </p>
        </div>
      </div>
    );
  }
}

export default CouldnotFindVideo;