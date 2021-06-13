import * as React from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { MdControlPoint } from "react-icons/md";
import { connect } from "react-redux";
import {
  getIdVideo,
  getPopularVideo,
  toggleWindowVideoPage,
} from "../../Actions/ProductsActions";
import DownloadIcon from "../../Components/SVGIcons/DownloadIcon/DownloadIcon";
import Heart from "../../Components/SVGIcons/Heart/Heart";
import VideoView from "../../Components/VideoView/VideoView";
import { IPopularVideos } from "../../Interfaces/Interfaces";
import { IApplicationState } from "../../Store/Store";
import "./TrendingVideo.scss";

export interface ITrendingVideoProps {
  getPopularVideo: typeof getPopularVideo;
  videos: IPopularVideos | null;
  toggleWindowVideoPage: typeof toggleWindowVideoPage;
  getIdVideo: typeof getIdVideo;
}


class TrendingVideo extends React.Component<ITrendingVideoProps, {}> {
  public componentDidMount() {
    const { videos } = this.props;
    if (videos === null) {
      this.props.getPopularVideo();
    }
  }

  public render() {
    const { videos } = this.props;

    return (
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
                        <div className="popular_video_item" data-id={value.id}>
                          <VideoView
                            src={value.video_files[0].link}
                            poster={value.image}
                            type={value.video_files[0].file_type}
                          />
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
              {videos !== null &&
                videos.videos.map(
                  (value, i) =>
                    i % 2 === 0 && (
                      <div key={i} className="col-12">
                        <div className="popular_video_item" data-id={value.id}>
                          <VideoView
                            src={value.video_files[0].link}
                            poster={value.image}
                            type={value.video_files[0].file_type}
                          />
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
    videos: state.products.videos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPopularVideo: () => dispatch(getPopularVideo()),
    toggleWindowVideoPage: () => dispatch(toggleWindowVideoPage()),
    getIdVideo: (id: number) => dispatch(getIdVideo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrendingVideo);
