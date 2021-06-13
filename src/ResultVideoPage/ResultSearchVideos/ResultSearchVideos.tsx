import * as React from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { FaRegImage, FaVideo } from "react-icons/fa";
import { MdControlPoint } from "react-icons/md";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getIdVideo,
  getSearchVideos,
  toggleWindowVideoPage,
} from "../../Actions/ProductsActions";
import CouldnotFindVideo from "../../Components/CouldnotFindVideo/CouldnotFindVideo";
import DownloadIcon from "../../Components/SVGIcons/DownloadIcon/DownloadIcon";
import Heart from "../../Components/SVGIcons/Heart/Heart";
import VideoView from "../../Components/VideoView/VideoView";
import { IDataSearch, IPopularVideos } from "../../Interfaces/Interfaces";
import { IApplicationState } from "../../Store/Store";
import "./ResultSearchVideos.scss";

export interface IResultSearchVideosProps {
  resultSearchVideo: IPopularVideos | null;
  getSearchVideos: typeof getSearchVideos;
  resultSearchImage: IDataSearch | null;
  searchNameVideo: string;
  toggleWindowVideoPage: typeof toggleWindowVideoPage;
  getIdVideo: typeof getIdVideo;
  isLoadingSearchVideosByName: boolean;
}

class ResultSearchVideos extends React.Component<IResultSearchVideosProps, {}> {
  public render() {
    const { searchNameVideo, resultSearchImage, resultSearchVideo } =
      this.props;

    return (
      <div className="container-xl video-result-bg">
        <div className="row video-result-bages">
          <div className="col">
            <div className="video-result-navigation">
              <NavLink
                activeClassName="video-result-bages-active"
                to={`/photos/${searchNameVideo}`}
              >
                <FaRegImage /> Photos
                <span>
                  {resultSearchImage === null
                    ? 0
                    : resultSearchImage.photos.length}
                </span>
              </NavLink>
              <NavLink activeClassName="video-result-bages-active" to="#">
                <FaVideo /> Videos
                <span>
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
                        <div className="result-video-item">
                          <VideoView
                            src={value.video_files[0].link}
                            poster={value.image}
                          />
                          <div
                            className="video-item-control"
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
                              poster={value.video_pictures[0].picture}
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
                        <div className="result-video-item">
                          <VideoView
                            src={value.video_files[0].link}
                            poster={value.image}
                          />
                          <div
                            className="video-item-control"
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
                              poster={value.video_pictures[0].picture}
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
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    resultSearchVideo: state.products.resultSearchVideo,
    searchNameVideo: state.products.searchNameVideo,
    resultSearchImage: state.products.resultSearchImage,
    isLoadingSearchVideosByName: state.products.isLoadingSearchVideosByName,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    toggleWindowVideoPage: () => dispatch(toggleWindowVideoPage()),
    getIdVideo: (id: number) => dispatch(getIdVideo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultSearchVideos);
