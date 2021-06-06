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
import Footer from "../Components/Footer/Footer";

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
    const {
      isLoadingVideos,
      searchNameVideo,
      resultSearchImage,
      resultSearchVideo,
    } = this.props;

    return (
      <>
        <HeaderResultVideoPage />
        <ModalWindowResultVideoPage />
        {isLoadingVideos ? (
          <LoadingPage />
        ) : (
          <>
            <div className="container-xl video_result_bg">
              <div className="row video-result-bages">
                <div className="col">
                  <div className="video-result-navigation">
                    <NavLink
                      activeClassName="video-result-bages-active"
                      to={`/photos/${searchNameVideo}`}
                    >
                      <FaRegImage /> Photos
                      <span className="ml-1">
                        {resultSearchImage === null
                          ? 0
                          : resultSearchImage.photos.length}
                      </span>
                    </NavLink>
                    <NavLink activeClassName="video-result-bages-active" to="#">
                      <FaVideo /> Videos
                      <span className="ml-1">
                        {resultSearchVideo === null
                          ? 0
                          : resultSearchVideo.videos.length}
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
              <CouldnotFindVideo />
              <div className="row video-result-search">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    {resultSearchVideo! &&
                      resultSearchVideo!.videos.map(
                        (value, i) =>
                          i % 2 !== 0 && (
                            <div key={i} className="col-12">
                              <div className="result_video_item">
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
                    {resultSearchVideo !== null &&
                      resultSearchVideo.videos.map(
                        (value, i) =>
                          i % 2 === 0 && (
                            <div key={i} className="col-12">
                              <div className="result_video_item">
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
                                    target="_blank"
                                    download={true}
                                    href={value.video_files[0].link}
                                    rel="noopener noreferrer"
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
          </>
        )}
        <Footer/>
      </>
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
    handlePreplayVideo: (e: React.MouseEvent<HTMLVideoElement>) =>
      dispatch(handlePreplayVideo(e)),
    handlePauseVideo: (e: React.MouseEvent<HTMLVideoElement>) =>
      dispatch(handlePauseVideo(e)),
    toggleWindowVideoPage: () => dispatch(toggleWindowVideoPage()),
    getIdVideo: (id: number) => dispatch(getIdVideo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultVideoPage);
