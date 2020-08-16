import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IPopularVideos, IDataSearch } from "../Interfaces/Interfaces";
import {
  getSearchVideos,
  handlePauseVideo,
  handlePreplayVideo,
  toggleWindowVideoPage,
  getIdVideo,
} from "../Actions/ProductsActions";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import HeaderResultVideoPage from "./HeaderResultVideoPage/HeaderResultVideoPage";
import "./ResultVideoPage.scss";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { MdControlPoint } from "react-icons/md";
import CouldnotFindVideo from "../Components/CouldnotFindVideo/CouldnotFindVideo";
import { FaRegImage, FaVideo } from "react-icons/fa";
import Heart from "../Components/SVGIcons/Heart/Heart";
import DownloadIcon from "../Components/SVGIcons/DownloadIcon/DownloadIcon";
import ModalWindowResultVideoPage from "../Components/ModalWindow/ModalWindowResultVideoPage/ModalWindowResultVideoPage";

export interface IPropsResultPage extends RouteComponentProps {
  resultSearchVideo: IPopularVideos | null;
  getSearchVideos: typeof getSearchVideos;
  resultSearchImage: IDataSearch | null;
  searchNameVideo: string;
  handlePreplayVideo: typeof handlePreplayVideo;
  handlePauseVideo: typeof handlePauseVideo;
  isLoadingVideos: boolean;
  toggleWindowVideoPage: typeof toggleWindowVideoPage;
  getIdVideo: typeof getIdVideo;
}

class ResultVideoPage extends React.Component<IPropsResultPage> {
  public render() {
    return (
      <React.Fragment>
        <HeaderResultVideoPage />
        <ModalWindowResultVideoPage/>
        {this.props.isLoadingVideos ? (
          <LoadingPage />
        ) : (
          <div className="container-xl">
            <div className="video-result-bages row align-items-center justify-content-md-center mt-3 mb-5">
              <div className="col-auto">
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item">
                    {" "}
                    <NavLink
                      activeClassName="video-result-bages-active"
                      to={`/photos/${this.props.searchNameVideo}`}
                    >
                      <FaRegImage /> Photos
                      <span className="ml-1">
                        {this.props.resultSearchImage === null
                          ? 0
                          : this.props.resultSearchImage.photos.length}
                      </span>
                    </NavLink>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <NavLink activeClassName="video-result-bages-active" to="#">
                      <FaVideo /> Videos
                      <span className="ml-1">
                        {this.props.resultSearchVideo === null
                          ? 0
                          : this.props.resultSearchVideo.videos.length}
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <CouldnotFindVideo />
            <div className="row ">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {this.props.resultSearchVideo !== null &&
                    this.props.resultSearchVideo.videos.map((value, i) =>
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
                                rel="noopener"
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
                              <Heart />
                            </span>
                          </div>
                        </div>
                      ) : null
                    )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {this.props.resultSearchVideo !== null &&
                    this.props.resultSearchVideo.videos.map(
                      (value, i) =>
                        i % 2 === 0 && (
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
                                  rel="noopener"
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
                                <Heart />
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    resultSearchVideo: state.products.resultSearchVideo,
    searchNameVideo: state.products.searchNameVideo,
    resultSearchImage: state.products.resultSearchImage,
    isLoadingVideos: state.products.isLoadingVideos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    handlePreplayVideo: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
      dispatch(handlePreplayVideo(e)),
    handlePauseVideo: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
      dispatch(handlePauseVideo(e)),
    toggleWindowVideoPage: () => dispatch(toggleWindowVideoPage()),
    getIdVideo: (id: number) => dispatch(getIdVideo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultVideoPage);
