import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import { IPopularVideos } from "../../../Interfaces/Interfaces";
import "./ModalWindowResultVideoPage.scss";
import Heart from "../../SVGIcons/Heart/Heart";
import { MdControlPoint, MdClose } from "react-icons/md";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import {
  toggleWindowVideoPage,
  toggleBtnMediaPlayer,
  stopMediaPlayer,
  watchingVideoForward,
  watchingVideoBack,
  toggleDropMenuVideoPage,
  clearVideoID,
} from "../../../Actions/ProductsActions";
import ResultVideoMediaPlayer from "../../MediaPlayers/ResultVideoMediaPlayer/ResultVideoMediaPlayer";

export interface IWindowResultVideoPageProps {
  resultSearchVideo: IPopularVideos | null;
  id: number;
  isOpen: boolean;
  isScrollTop: number | null;
  isOpenDropDownMenu: boolean;
  toggleWindowVideoPage: typeof toggleWindowVideoPage;
  toggleDropMenuVideoPage: typeof toggleDropMenuVideoPage;
  toggleBtnMediaPlayer: typeof toggleBtnMediaPlayer;
  stopMediaPlayer: typeof stopMediaPlayer;
  watchingVideoForward: typeof watchingVideoForward;
  watchingVideoBack: typeof watchingVideoBack;
  clearVideoID: typeof clearVideoID;
}

export interface State {}

class ModalWindowResultVideoPage extends React.Component<
  IWindowResultVideoPageProps,
  State
> {
  public render() {
    const { isOpenDropDownMenu, resultSearchVideo, id } = this.props;

    return (
      <React.Fragment>
        {resultSearchVideo !== null && (
          <div
            className={
              this.props.isOpen
                ? "d-block modal_result_window_video_basis"
                : "d-none"
            }
          >
            <div className="container-xl modal_result_window_video_main">
              <div className="row modal_result_window_video_bg">
                <MdClose
                  className="close_icon"
                  onClick={() => {
                    this.props.toggleWindowVideoPage();
                    this.props.toggleBtnMediaPlayer(false);
                    this.props.stopMediaPlayer();
                    this.props.clearVideoID();
                  }}
                />
                <div className="col-12 description_video order-lg-first order-last">
                  <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-2 order-lg-first order-last">
                      <small>VIDEOGRAPHER</small>
                      <p>
                        <span>
                          {resultSearchVideo.videos.length > 0 &&
                            resultSearchVideo.videos[id].user.name.charAt(0)}
                        </span>
                        {resultSearchVideo.videos.length > 0 &&
                          resultSearchVideo.videos[id].user.name}
                      </p>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mb-2 text-center">
                      <button className="btn btn-light mr-2 mb-2 heart">
                        <Heart
                          id={resultSearchVideo.videos[id].id}
                          src={resultSearchVideo.videos[id].video_files[0].link}
                          photographer={resultSearchVideo.videos[id].user.name}
                        />{" "}
                        Likes
                      </button>
                      <button className="btn btn-light mr-2 mb-2 control_point">
                        <MdControlPoint /> Collect
                      </button>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-2 download_item_bg">
                      <button
                        className="btn download w-100"
                        onClick={this.props.toggleDropMenuVideoPage}
                      >
                        Free download{" "}
                        {isOpenDropDownMenu ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </button>
                      {/* <DropMenuVideoPage /> */}
                    </div>
                  </div>
                </div>
                <div className="col-12 align-self-center modal_window_video">
                  <ResultVideoMediaPlayer />
                  <span
                    className="arrow_left"
                    onClick={() => {
                      this.props.toggleBtnMediaPlayer(false);
                      this.props.stopMediaPlayer();
                      this.props.watchingVideoBack(id);
                    }}
                  >
                    <IoIosArrowBack />
                  </span>
                  <span
                    className="arrow_right"
                    onClick={() => {
                      this.props.toggleBtnMediaPlayer(false);
                      this.props.stopMediaPlayer();
                      this.props.watchingVideoForward(id);
                    }}
                  >
                    <IoIosArrowForward />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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
    toggleBtnMediaPlayer: (value: boolean) =>
      dispatch(toggleBtnMediaPlayer(value)),
    stopMediaPlayer: () => dispatch(stopMediaPlayer()),
    watchingVideoForward: (id: number) => dispatch(watchingVideoForward(id)),
    watchingVideoBack: (id: number) => dispatch(watchingVideoBack(id)),
    clearVideoID: () => dispatch(clearVideoID()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindowResultVideoPage);
