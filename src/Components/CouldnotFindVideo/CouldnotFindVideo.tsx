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

class CouldnotFindVideo extends React.Component<ICouldnotFindVideoProps, {}> {
  public render() {
    const { resultSearchVideo, searchNameVideo } = this.props;

    if (
      resultSearchVideo !== undefined &&
      resultSearchVideo !== null &&
      resultSearchVideo.videos.length > 0
    ) {
      return (
        <div className="row find-video-name">
          <div className="col-12">
            <h2>{searchNameVideo} Videos</h2>
          </div>
        </div>
      );
    }

    if (resultSearchVideo !== undefined && resultSearchVideo === null) {
      return (
        <div className="row not-find-video-name">
          <div className="col-12">
            <h2 className="text-center mb-5">
              We Couldn't Find Anything For "{this.props.searchNameVideo}"
            </h2>
          </div>
          <div className="col-12">
            <p>Try spelling the word correctly</p>
            <p>
              Discover beautiful videos on{" "}
              <NavLink to="/videos">the main page »</NavLink>
            </p>
          </div>
        </div>
      );
    }

    return (
      <>
        {resultSearchVideo !== undefined &&
          resultSearchVideo !== null &&
          resultSearchVideo.videos.length === 0 && (
            <div className="row not-find-video-name">
              <div className="col-12">
                <h2>
                  We Couldn't Find Anything For "{this.props.searchNameVideo}"
                </h2>
              </div>
              <div className="col-12">
                <p>Try spelling the word correctly</p>
                <p>
                  Discover beautiful videos on{" "}
                  <NavLink to="/videos">the main page »</NavLink>
                </p>
              </div>
            </div>
          )}
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    searchNameVideo: state.products.searchNameVideo,
    resultSearchVideo: state.products.resultSearchVideo,
  };
};

export default connect(mapStateToProps, {})(CouldnotFindVideo);
