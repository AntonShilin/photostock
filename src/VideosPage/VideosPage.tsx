import * as React from "react";
import { connect } from "react-redux";
import { IPopularVideos } from "../Interfaces/Interfaces";
import {
  getPopularVideo,
  getSearchVideos,
  changeNameVideo,
  getSearchImages,
  toggleWindowVideoPage,
  getIdVideo,
  clearKeyPressNumber,
} from "../Actions/ProductsActions";
import { IApplicationState } from "../Store/Store";
import "./VideosPage.scss";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import { FiSearch } from "react-icons/fi";
import NavigationPages from "../Components/NavigationPages/NavigationPages";
import HeaderVideoPage from "./HeaderVideoPage/HeaderVideoPage";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { MdControlPoint } from "react-icons/md";
import SuggestedVideoWords from "../Components/SuggestedVideoWords/SuggestedVideoWords";
import Heart from "../Components/SVGIcons/Heart/Heart";
import ModalVideoPage from "../Components/ModalWindow/ModalWindowVideoPage/ModalVideoPage";
import DownloadIcon from "../Components/SVGIcons/DownloadIcon/DownloadIcon";
import Footer from "../Components/Footer/Footer";

export interface IPropsVideosPage extends RouteComponentProps {
  getPopularVideo: typeof getPopularVideo;
  videos: IPopularVideos | null;
  searchNameVideo: string;
  searchNamePhoto: string;
  getSearchVideos: typeof getSearchVideos;
  changeNameVideo: typeof changeNameVideo;
  getSearchImages: typeof getSearchImages;
  isLoadingPopularVideos: boolean;
  toggleWindowVideoPage: typeof toggleWindowVideoPage;
  getIdVideo: typeof getIdVideo;
  keyboardKey: number | null;
  clearKeyPressNumber: typeof clearKeyPressNumber;
}

class VideosPage extends React.Component<IPropsVideosPage> {
  public componentDidMount() {
    const { videos } = this.props;
    if (videos === null) {
      this.props.getPopularVideo();
    }
  }

  public pressEnterKey = () => {
    if (this.props.searchNameVideo.trim().length > 0) {
      this.props.getSearchImages(this.props.searchNameVideo!);
      this.props.getSearchVideos(this.props.searchNameVideo!);
      this.props.history.push(`/videos/${this.props.searchNameVideo}`);
      this.props.clearKeyPressNumber();
    }
  };

  public render() {
    const { isLoadingPopularVideos, videos } = this.props;

    return (
      <>
        <HeaderVideoPage />
        <ModalVideoPage />
        <div className="container-xl videos-page-header">
          <video
            controls={false}
            // autoPlay={navigator.appCodeName === "Safari" ? false : true}
            loop={true}
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/photoandvideo-b979e.appspot.com/o/forest.mp4?alt=media&token=d0db507a-dc26-42f7-aeb2-6046f7481bb4"
              type="video/mp4"
            />
            Your browser doesn't support HTML5 video tag.
          </video>
          <div className="container-xl video_search_item_bg">
            <div className="video_search_item">
              <h1>The best free stock videos from talented authors.</h1>
              <div className="input-group input-group-lg">
                <input
                  required={true}
                  type="text"
                  className="form-control"
                  placeholder="Search for free videos"
                  value={this.props.searchNameVideo}
                  onChange={this.props.changeNameVideo}
                  autoFocus={false}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      this.pressEnterKey();
                    }
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
        <NavigationPages />
        {isLoadingPopularVideos ? (
          <LoadingPage />
        ) : (
          <div className="container-xl trending_video_header">
            <div className="row">
              <div className="col-12">
                <h6>Trending Free Stock Videos</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {videos !== null &&
                    videos.videos.map(
                      (value, i) =>
                        i % 2 !== 0 && (
                          <div key={i} className="col-12">
                            <div
                              className="popular_video_item"
                              data-id={value.id}
                            >
                              <video
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
                              <div
                                className="video_item_control"
                                onClick={() => {
                                  this.props.toggleWindowVideoPage();
                                  this.props.getIdVideo(value.id);
                                }}
                              >
                                <AiOutlinePlayCircle />
                              </div>
                              <div className="video-person-name">
                                <p>{value.user.name}</p>
                              </div>
                              <span>
                                <a
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  download={true}
                                  href={value.video_files[0].link}
                                >
                                  <DownloadIcon />
                                </a>
                              </span>
                              <span>
                                <MdControlPoint />
                              </span>
                              <span>
                                <Heart
                                  id={value.id}
                                  src={value.video_files[0].link}
                                  videographer={value.user.name}
                                  photographer={null}
                                  liked={false}
                                />
                              </span>
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {videos !== null &&
                    videos.videos.map(
                      (value, i) =>
                        i % 2 === 0 && (
                          <div key={i} className="col-12">
                            <div
                              className="popular_video_item"
                              data-id={value.id}
                            >
                              <video
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
                              <div
                                className="video_item_control"
                                onClick={() => {
                                  this.props.toggleWindowVideoPage();
                                  this.props.getIdVideo(value.id);
                                }}
                              >
                                <AiOutlinePlayCircle />
                              </div>
                              <div className="video-person-name">
                                <p>{value.user.name}</p>
                              </div>
                              <span>
                                <a
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  download={true}
                                  href={value.video_files[0].link}
                                >
                                  <DownloadIcon />
                                </a>
                              </span>
                              <span>
                                <MdControlPoint />
                              </span>
                              <span>
                                <Heart
                                  id={value.id}
                                  src={value.video_files[0].link}
                                  videographer={value.user.name}
                                  photographer={null}
                                  liked={false}
                                />
                              </span>
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    videos: state.products.videos,
    searchNameVideo: state.products.searchNameVideo,
    searchNamePhoto: state.products.searchNamePhoto,
    isLoadingPopularVideos: state.products.isLoadingPopularVideos,
    keyboardKey: state.products.keyboardKey,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPopularVideo: () => dispatch(getPopularVideo()),
    changeNameVideo: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(changeNameVideo(e)),
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    toggleWindowVideoPage: () => dispatch(toggleWindowVideoPage()),
    getIdVideo: (id: number) => dispatch(getIdVideo(id)),
    clearKeyPressNumber: () => dispatch(clearKeyPressNumber()),
  };
};

const withRouterProps = withRouter(VideosPage);
export default connect(mapStateToProps, mapDispatchToProps)(withRouterProps);
