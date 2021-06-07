import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import { IPopularVideos } from "../../../Interfaces/Interfaces";
import "./ModalWindowResultVideoPage.scss";
import {
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import {
  toggleWindowVideoPage,
  watchingVideoForward,
  watchingVideoBack,
  toggleDropMenuVideoPage,
} from "../../../Actions/ProductsActions";
import ButtonLike from "../../ControlKeys/ButtonLike/ButtonLike";
import Collect from "../../ControlKeys/Collect/Collect";
import FreeDownload from "../../ControlKeys/FreeDownload/FreeDownload";
import Player from "../../MediaPlayers/Player/Player";

export interface IWindowResultVideoPageProps {
  resultSearchVideo: IPopularVideos | null;
  id: number;
  isOpen: boolean;
  isScrollTop: number | null;
  isOpenDropDownMenu: boolean;
  toggleWindowVideoPage: typeof toggleWindowVideoPage;
  toggleDropMenuVideoPage: typeof toggleDropMenuVideoPage;
  watchingVideoForward: typeof watchingVideoForward;
  watchingVideoBack: typeof watchingVideoBack;
}

export interface State {}

class ModalWindowResultVideoPage extends React.Component<
  IWindowResultVideoPageProps,
  State
> {
  public render() {
    const { isOpenDropDownMenu, resultSearchVideo, id, isOpen } = this.props;

    return (
      <>
        {resultSearchVideo !== null && isOpen && (
          <div className="modal-video-result-page">
          <button
            className="modal-close-btn"
            onClick={() => {
              this.props.toggleWindowVideoPage();
            }}
          >
            &#10799;
          </button>
          <div className="modal-video-result-page-bg">
            <div className="modal-video-result-page-title">
              <div className="modal-video-result-page-title-header">
                <small>videographer</small>
              </div>
              <div className="modal-video-result-page-title-left">
                <span>{resultSearchVideo.videos[id].user.name.charAt(0)}</span>
                <h5>{resultSearchVideo.videos[id].user.name}</h5>
              </div>
              <div className="modal-video-result-page-title-right">
                <div className="modal-video-result-page-title-buttons-group">
                  <ButtonLike
                    id={resultSearchVideo.videos[id].id}
                    src={resultSearchVideo.videos[id].video_files[0].link}
                    photographer={null}
                    videographer={resultSearchVideo.videos[id].user.name}
                    liked={false}
                  />
                  <Collect
                    id={resultSearchVideo.videos[id].id}
                    src={resultSearchVideo.videos[id].video_files[0].link}
                    photographer={null}
                    videographer={resultSearchVideo.videos[id].user.name}
                    liked={false}
                  />
                  <FreeDownload />
                </div>
              </div>
            </div>
            <div className="modal-video-result-page-content">
              <Player
                src={resultSearchVideo.videos[id].video_files[0].link}
              />
              <span
                className="modal-video-result-page-arrow-left"
                onClick={() => this.props.watchingVideoBack(id)}
              >
                <IoIosArrowBack />
              </span>
              <span className="modal-video-result-page-arrow-right">
                <IoIosArrowForward
                  onClick={() => this.props.watchingVideoForward(id)}
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
  resultSearchVideo: state.products.resultSearchVideo,
  id: state.products.modalWindowVideoPage.id,
  isOpen: state.products.modalWindowVideoPage.isOpen,
  isScrollTop: state.products.isScrollTop,
  isOpenDropDownMenu: state.products.modalWindowVideoPage.isOpenDropDownMenu,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleWindowVideoPage: () => dispatch(toggleWindowVideoPage()),
    toggleDropMenuVideoPage: () => dispatch(toggleDropMenuVideoPage()),
    watchingVideoForward: (id: number) => dispatch(watchingVideoForward(id)),
    watchingVideoBack: (id: number) => dispatch(watchingVideoBack(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindowResultVideoPage);
