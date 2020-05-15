import * as React from "react";
import { connect } from "react-redux";
import { IPopularVideos } from "../Interfaces/Interfaces";
import {
  getPopularVideo,
  getSearchVideos,
  changeNameVideo,
} from "../Actions/ProductsActions";
import { IApplicationState } from "../Store/Store";
import "./VideosPage.scss";
import LoadingPage from "../LoadingPage/LoadingPage";
import { FiSearch } from "react-icons/fi";
import NavigationPages from "../NavigationPages/NavigationPages";
import HeaderVideoPage from "./HeaderVideoPage/HeaderVideoPage";
import { NavLink } from "react-router-dom";

export interface IPropsVideosPage {
  getPopularVideo: typeof getPopularVideo;
  popularVideo: IPopularVideos | null;
  searchNameVideo: string;
  getSearchVideos: typeof getSearchVideos;
  changeNameVideo: typeof changeNameVideo;
}

class VideosPage extends React.Component<IPropsVideosPage> {
  public componentDidMount() {
    this.props.getPopularVideo();
  }
  public render() {
    return (
      <React.Fragment>
        <HeaderVideoPage />
        <div className="container-xl bg-videos-page">
          <h1 className="pb-5 text-white">
            The best free stock videos from talented authors.
          </h1>
          <div className="input-group mb-3 input-group-lg">
            <input
              type="text"
              className="form-control"
              placeholder="Find video"
              value={this.props.searchNameVideo}
              onChange={this.props.changeNameVideo}
              autoFocus={false}
            />
            <div className="input-group-append">
              <NavLink
                to={`/videos/${this.props.searchNameVideo}`}
                className="input-group-text"
                onClick={() => {
                    this.props.getSearchVideos(this.props.searchNameVideo);
                }}
              >
                <FiSearch />
              </NavLink>
            </div>
          </div>
          <h6>
            Search ideas:{" "}
            <span className="text-white">
              businessman, hd wallpapers, abstract, phone, green, more...
            </span>
          </h6>
        </div>
        <NavigationPages />
        <div className="container-xl bg-light">
          <div className="row">
            <div className="col-12">
              <h6 className="mt-3 mb-3">New free stock videos</h6>
            </div>
          </div>
          <div className="row justify-content-center">
            {this.props.popularVideo !== null ? (
              this.props.popularVideo.videos.map((value, i) => (
                <div key={i} className="col-lg-6 col-md-6 col-sm-12">
                  <div className="d-inline m-1">
                    <video controls={true} className="img-fluid">
                      <source
                        src={value.video_files[2].link}
                        type={value.video_files[2].file_type}
                      />
                    </video>
                  </div>
                </div>
              ))
            ) : (
              <LoadingPage />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    popularVideo: store.products.videos,
    searchNameVideo: store.products.searchNameVideo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPopularVideo: () => dispatch(getPopularVideo()),
    changeNameVideo: (e: string) => dispatch(changeNameVideo(e)),
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage);
