import * as React from "react";
import { NavLink } from "react-router-dom";
import "./CouldnotFindVideo.scss";
import { IApplicationState } from "../../Store/Store";
import { IPopularVideos } from "../../Interfaces/Interfaces";
import { connect } from "react-redux";

export interface ICouldnotFindVideoProps {
  searchNameVideo?: string;
  resultSearchVideo?: IPopularVideos | null;
}

export interface State {}

class CouldnotFindVideo extends React.Component<ICouldnotFindVideoProps, State> {
  public render() {
    return (
      <React.Fragment>
        {
        this.props.resultSearchVideo?.videos.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-5">
                We Couldn't Find Anything For "{this.props.searchNameVideo}"
              </h2>
            </div>
            <div className="col-12">
              <p className="text-left">Try spelling the word correctly</p>
              <p className="text-left">
                Discover beautiful photos on{" "}
                <NavLink to="/photos">the main page »</NavLink>
              </p>
            </div>
          </div>
          ) :
          <div className="row mb-3">
            <div className="col-12">
              <h2 className="text-center">{this.props.searchNameVideo} Images</h2>
            </div>
        </div>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    searchNameVideo: store.products.searchNameVideo,
  resultSearchVideo: store.products.resultSearchVideo
  };
};

export default connect(mapStateToProps,null)(CouldnotFindVideo);