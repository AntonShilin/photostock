import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import {
  changeNameVideo,
  clearKeyPressNumber,
  getSearchImages,
  getSearchVideos,
} from "../../Actions/ProductsActions";
import SuggestedVideoWords from "../../Components/SuggestedVideoWords/SuggestedVideoWords";
import { IPopularVideos } from "../../Interfaces/Interfaces";
import { IApplicationState } from "../../Store/Store";
import "./MainVideoPage.scss";

export interface IMainVideoPageProps extends RouteComponentProps {
  videos: IPopularVideos | null;
  searchNameVideo: string;
  searchNamePhoto: string;
  getSearchVideos: typeof getSearchVideos;
  changeNameVideo: typeof changeNameVideo;
  getSearchImages: typeof getSearchImages;
  keyboardKey: number | null;
  clearKeyPressNumber: typeof clearKeyPressNumber;
}


class MainVideoPage extends React.Component<IMainVideoPageProps, {}> {
  private videoHeader: React.RefObject<HTMLVideoElement>;
  constructor(props: IMainVideoPageProps) {
    super(props);
    this.videoHeader = React.createRef();
  }

  public componentDidMount() {
    if (navigator.appCodeName === "Safari") {
      this.videoHeader!.current?.load();
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
    const { searchNameVideo, searchNamePhoto } = this.props;

    return (
      <div className="container-xl videos-page-header">
        <video
          controls={false}
          autoPlay={true}
          loop={true}
          playsInline={true}
          ref={this.videoHeader}
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
                value={searchNameVideo}
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
                  to={`/videos/${searchNameVideo}`}
                  className="input-group-text"
                  onClick={() => {
                    this.props.getSearchVideos(searchNameVideo);
                    this.props.getSearchImages(searchNamePhoto);
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
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    videos: state.products.videos,
    searchNameVideo: state.products.searchNameVideo,
    searchNamePhoto: state.products.searchNamePhoto,
    keyboardKey: state.products.keyboardKey,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeNameVideo: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(changeNameVideo(e)),
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    clearKeyPressNumber: () => dispatch(clearKeyPressNumber()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainVideoPage)
);
