import * as React from "react";
import { connect } from "react-redux";
import { IPopularVideos } from "../Interfaces/Interfaces";
import {
  getPopularVideo,
  getSearchVideos,
  changeNameVideo,
  handleLikeHeart,
  handlePreplayVideo,
  handlePauseVideo,
  getSearchImages,
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

export interface IPropsVideosPage {
  getPopularVideo: typeof getPopularVideo;
  popularVideo: IPopularVideos | null;
  searchNameVideo: string;
  searchNamePhoto: string;
  getSearchVideos: typeof getSearchVideos;
  changeNameVideo: typeof changeNameVideo;
  handleLikeHeart: typeof handleLikeHeart;
  handlePreplayVideo: typeof handlePreplayVideo;
  handlePauseVideo: typeof handlePauseVideo;
  getSearchImages: typeof getSearchImages;
  isLoadingVideos: boolean;
}

class VideosPage extends React.Component<IPropsVideosPage> {
  private heart: React.RefObject<SVGSVGElement> | null;

  constructor(props: IPropsVideosPage) {
    super(props);
    this.heart = React.createRef();
  }

  public componentDidMount() {
    this.props.getPopularVideo();
  }
  public render() {
    return (
      <React.Fragment>
        <HeaderVideoPage />
        <div className="container-fluid bg-videos-page">
          {this.props.popularVideo !== null ? (
            <video
              controls={false}
              autoPlay={true}
              loop={true}
              poster={this.props.popularVideo.videos[0].image}
            >
              <source
                src={this.props.popularVideo.videos[0].video_files[4].link}
                type={
                  this.props.popularVideo.videos[0].video_files[4].file_type
                }
              />
              Your browser doesn't support HTML5 video tag.
            </video>
          ) : null}
          <div className="container-xl">
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
              <h6>
                Suggested:
                <span className="text-white pl-2">
                  businessman, hd wallpapers, abstract, phone, green, more...
                </span>
              </h6>
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
                                  <svg
                                    className="heart"
                                    viewBox="0 -2 35 35"
                                    xmlns="http://www.w3.org/2000/svg"
                                    strokeWidth="0"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    width="1.6em"
                                    height="1.3em"
                                    ref={this.heart}
                                    onClick={(e) =>
                                      this.props.handleLikeHeart(e)
                                    }
                                  >
                                    <path
                                      d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                                    />
                                  </svg>
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
                                  <svg
                                    className="heart"
                                    viewBox="0 -2 35 35"
                                    xmlns="http://www.w3.org/2000/svg"
                                    strokeWidth="0"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    width="1.6em"
                                    height="1.3em"
                                    ref={this.heart}
                                    onClick={(e) =>
                                      this.props.handleLikeHeart(e)
                                    }
                                  >
                                    <path
                                      d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                                    />
                                  </svg>
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

const mapStateToProps = (store: IApplicationState) => {
  return {
    popularVideo: store.products.videos,
    searchNameVideo: store.products.searchNameVideo,
    searchNamePhoto: store.products.searchNamePhoto,
    isLoadingVideos: store.products.isLoadingVideos
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPopularVideo: () => dispatch(getPopularVideo()),
    changeNameVideo: (e: string) => dispatch(changeNameVideo(e)),
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    handleLikeHeart: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
      dispatch(handleLikeHeart(e)),
    handlePreplayVideo: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
      dispatch(handlePreplayVideo(e)),
    handlePauseVideo: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
      dispatch(handlePauseVideo(e)),
      getSearchImages: (name: string) => dispatch(getSearchImages(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage);
