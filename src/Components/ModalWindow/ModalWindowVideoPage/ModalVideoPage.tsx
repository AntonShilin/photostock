import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import { IPopularVideos } from "../../../Interfaces/Interfaces";
import "./ModalVideoPage.scss";
import {
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import {
  toggleWindowVideoPage,
  toggleDropMenuVideoPage,
  watchingPopularVideoForward,
  watchingPopularVideoBack,
  clearVideoID,
} from "../../../Actions/ProductsActions";
import ButtonLike from "../../ControlKeys/ButtonLike/ButtonLike";
import Collect from "../../ControlKeys/Collect/Collect";
import FreeDownload from "../../ControlKeys/FreeDownload/FreeDownload";
import Player from "../../MediaPlayers/Player/Player";

export interface IWindowVideoPageProps {
  videos: IPopularVideos | null;
  id: number;
  isOpen: boolean;
  isScrollTop: number | null;
  isOpenDropDownMenu: boolean;
  toggleWindowVideoPage: typeof toggleWindowVideoPage;
  toggleDropMenuVideoPage: typeof toggleDropMenuVideoPage;
  watchingPopularVideoForward: typeof watchingPopularVideoForward;
  watchingPopularVideoBack: typeof watchingPopularVideoBack;
  clearVideoID: typeof clearVideoID;
}

export interface IWindowVideoPageState {}

class ModalVideoPage extends React.Component<
  IWindowVideoPageProps,
  IWindowVideoPageState
> {
  public render() {
    const { isOpenDropDownMenu, videos, id, isOpen } = this.props;

    return (
      <>
        {videos !== null && isOpen && (
          <div className="modal-video-page">
            <button
              className="modal-close-btn"
              onClick={() => {
                this.props.toggleWindowVideoPage();
              }}
            >
              &#10799;
            </button>
            <div className="modal-video-page-bg">
              <div className="modal-video-page-title">
                <div className="modal-video-page-title-header">
                  <small>videographer</small>
                </div>
                <div className="modal-video-page-title-left">
                  <span>{videos.videos[id].user.name.charAt(0)}</span>
                  <h5>{videos.videos[id].user.name}</h5>
                </div>
                <div className="modal-video-page-title-right">
                  <div className="modal-video-page-title-buttons-group">
                    <ButtonLike
                      id={videos.videos[id].id}
                      src={videos.videos[id].video_files[0].link}
                      photographer={null}
                      videographer={videos.videos[id].user.name}
                      liked={false}
                    />
                    <Collect
                      id={videos.videos[id].id}
                      src={videos.videos[id].video_files[0].link}
                      photographer={null}
                      videographer={videos.videos[id].user.name}
                      liked={false}
                    />
                    <FreeDownload />
                  </div>
                </div>
              </div>
              <div className="modal-video-page-content">
                <Player
                  src={videos.videos[id].video_files[0].link}
                  poster={videos.videos[id].video_pictures[0].picture}
                  type={videos.videos[id].video_files[0].file_type}
                />
                <span
                  className="modal-video-page-arrow-left"
                  onClick={() => this.props.watchingPopularVideoBack(id)}
                >
                  <IoIosArrowBack />
                </span>
                <span className="modal-video-page-arrow-right">
                  <IoIosArrowForward
                    onClick={() => this.props.watchingPopularVideoForward(id)}
                  />
                </span>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  videos: state.products.videos,
  id: state.products.modalWindowVideoPage.id,
  isOpen: state.products.modalWindowVideoPage.isOpen,
  isScrollTop: state.products.isScrollTop,
  isOpenDropDownMenu: state.products.modalWindowVideoPage.isOpenDropDownMenu,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleWindowVideoPage: () => dispatch(toggleWindowVideoPage()),
    toggleDropMenuVideoPage: () => dispatch(toggleDropMenuVideoPage()),
    watchingPopularVideoForward: (id: number) =>
      dispatch(watchingPopularVideoForward(id)),
    watchingPopularVideoBack: (id: number) =>
      dispatch(watchingPopularVideoBack(id)),
    clearVideoID: () => dispatch(clearVideoID()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalVideoPage);
