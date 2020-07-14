import * as React from "react";
import { connect } from "react-redux";
import { IPopularVideos } from "../Interfaces/Interfaces";
import {
  getPopularVideo,
  getSearchVideos,
  changeNameVideo,
  handlePreplayVideo,
  handlePauseVideo,
  getSearchImages,
  handleSearchKeydown,
} from "../Actions/ProductsActions";
import { IApplicationState } from "../Store/Store";
import "./VideosPage.scss";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import { FiSearch } from "react-icons/fi";
import NavigationPages from "../Components/NavigationPages/NavigationPages";
import HeaderVideoPage from "./HeaderVideoPage/HeaderVideoPage";
import { NavLink } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { MdControlPoint } from "react-icons/md";
import SuggestedVideoWords from "../Components/SuggestedVideoWords/SuggestedVideoWords";
import Heart from "../Components/SVGIcons/Heart/Heart";
import forest from "../Components/media/forest.mp4";

export interface IPropsVideosPage {
  getPopularVideo: typeof getPopularVideo;
  popularVideo: IPopularVideos | null;
  searchNameVideo: string;
  searchNamePhoto: string;
  getSearchVideos: typeof getSearchVideos;
  changeNameVideo: typeof changeNameVideo;
  handlePreplayVideo: typeof handlePreplayVideo;
  handlePauseVideo: typeof handlePauseVideo;
  getSearchImages: typeof getSearchImages;
  getKeyNumber: typeof handleSearchKeydown;
  isLoadingVideos: boolean;
}

class VideosPage extends React.Component<IPropsVideosPage> {
  public componentDidMount() {
    this.props.getPopularVideo();
  }

  public render() {
    return (
      <React.Fragment>
        <HeaderVideoPage />
        <div className="container-fluid videos-page-bg">
            <video controls={false} autoPlay={true} loop={true}>
              <source src={forest} type="video/mp4" />
              Your browser doesn't support HTML5 video tag.
            </video>
          <div className="container-xl video_search_item_bg">
            <div className="video_search_item">
              <h1 className="pb-1">
                The best free stock videos from talented authors.
              </h1>
              <div className="input-group mb-3 input-group-lg">
                <input
                  required={true}
                  type="text"
                  className="form-control"
                  placeholder="Find video"
                  value={this.props.searchNameVideo}
                  onChange={this.props.changeNameVideo}
                  autoFocus={false}
                  onKeyDown={(e) => {
                    this.props.getKeyNumber(e);
                  }}
                />
                <div className="input-group-append">
                  <NavLink
                    to={`/videos/${this.props.searchNameVideo}`}
                    className="input-group-text"
                    onClick={() => {
                      this.props.getSearchVideos(this.props.searchNameVideo);
                      this.props.getSearchImages(this.props.searchNamePhoto);
                    }}
                  >
                    <FiSearch />
                  </NavLink>
                </div>
              </div>
              <SuggestedVideoWords />
            </div>
          </div>
        </div>
        {this.props.isLoadingVideos ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
            <NavigationPages />
            <div className="container-xl">
              <div className="row">
                <div className="col-12">
                  <h6 className="mt-4 mb-4">Trending Free Stock Videos</h6>
                </div>
              </div>
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    {this.props.popularVideo !== null
                      ? this.props.popularVideo.videos.map((value, i) =>
                          i % 2 ? (
                            <div key={i} className="col-12">
                              <div className="m-1 popular_video_item">
                                <video
                                  onMouseOver={(e) =>
                                    this.props.handlePreplayVideo(e)
                                  }
                                  onMouseLeave={(e) =>
                                    this.props.handlePauseVideo(e)
                                  }
                                  controls={false}
                                  muted={true}
                                  poster={value.image}
                                >
                                  <source
                                    src={value.video_files[0].link}
                                    type={value.video_files[0].file_type}
                                  />
                                  Your browser doesn't support HTML5 video tag.
                                </video>
                                <div className="video_item_control">
                                  <AiOutlinePlayCircle
                                    style={{
                                      fontSize: "3.5rem",
                                      color: "white",
                                    }}
                                  />
                                </div>
                                <div className="video-person-name">
                                  <p>{value.user.name}</p>
                                </div>
                                <span>
                                  <MdControlPoint
                                    style={{
                                      color: "white",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                                </span>
                                <span>
                                  <Heart />
                                </span>
                              </div>
                            </div>
                          ) : null
                        )
                      : null}
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    {this.props.popularVideo !== null
                      ? this.props.popularVideo.videos.map((value, i) =>
                          i % 2 === 0 ? (
                            <div key={i} className="col-12">
                              <div className="m-1 popular_video_item">
                                <video
                                  onMouseOver={(e) =>
                                    this.props.handlePreplayVideo(e)
                                  }
                                  onMouseLeave={(e) =>
                                    this.props.handlePauseVideo(e)
                                  }
                                  controls={false}
                                  muted={true}
                                  poster={value.image}
                                >
                                  <source
                                    src={value.video_files[0].link}
                                    type={value.video_files[0].file_type}
                                  />
                                  Your browser doesn't support HTML5 video tag.
                                </video>
                                <div className="video_item_control">
                                  <AiOutlinePlayCircle
                                    style={{
                                      fontSize: "3.5rem",
                                      color: "white",
                                    }}
                                  />
                                </div>
                                <div className="video-person-name">
                                  <p>{value.user.name}</p>
                                </div>
                                <span>
                                  <MdControlPoint
                                    style={{
                                      color: "white",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                                </span>
                                <span>
                                  <Heart />
                                </span>
                              </div>
                            </div>
                          ) : null
                        )
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    popularVideo: state.products.videos,
    searchNameVideo: state.products.searchNameVideo,
    searchNamePhoto: state.products.searchNamePhoto,
    isLoadingVideos: state.products.isLoadingVideos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getKeyNumber: (e: React.KeyboardEvent<HTMLInputElement>) =>
      dispatch(handleSearchKeydown(e)),
    getPopularVideo: () => dispatch(getPopularVideo()),
    changeNameVideo: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(changeNameVideo(e)),
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    handlePreplayVideo: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
      dispatch(handlePreplayVideo(e)),
    handlePauseVideo: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
      dispatch(handlePauseVideo(e)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage);
