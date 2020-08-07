import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import { IPopularVideos } from "../../../Interfaces/Interfaces";
import "./ModalVideoPage.scss";
import Heart from "../../SVGIcons/Heart/Heart";
import { MdControlPoint, MdClose } from "react-icons/md";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import {
  toggleDropMenuPhotoPage,
  toggleWindowVideoPage,
  toggleBtnMediaPlayer,
  stopMediaPlayer,
  watchingVideoForward,
  watchingVideoBack,
} from "../../../Actions/ProductsActions";
import MediaPlayer from "./MediaPlayer/MediaPlayer";

export interface IWindowVideoPageProps {
  data: IPopularVideos | null;
  id: number[];
  isOpen: boolean;
  isScrollTop: number | null;
  isOpenDropDownMenu: boolean;
  toggleWindowVideoPage: typeof toggleWindowVideoPage;
  toggleDropMenuPhotoPage: typeof toggleDropMenuPhotoPage;
  toggleBtnMediaPlayer: typeof toggleBtnMediaPlayer;
  stopMediaPlayer: typeof stopMediaPlayer;
  watchingVideoForward: typeof watchingVideoForward;
  watchingVideoBack: typeof watchingVideoBack;
  videoID: number;
}

export interface State {}

class ModalVideoPage extends React.Component<IWindowVideoPageProps, State> {
  public render() {
    const { isOpenDropDownMenu, data, id ,videoID} = this.props;
    
    return (
      <React.Fragment>
        {data!==null && (
          <div
            className={
              this.props.isOpen ? "d-block modal_window_video_basis" : "d-none"
            }
          >
            <div className="container-xl">
              <div className="row modal_window_video_bg">
                <MdClose
                  className="close_icon"
                  onClick={() => {
                    this.props.toggleWindowVideoPage()
                    this.props.toggleBtnMediaPlayer(false)
                    this.props.stopMediaPlayer()
                  }}
                />
                <div className="col-12 description_video">
                  <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-2">
                      <p className="text-center">
                        {data.videos[id[0]].user.name}
                      </p>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mb-2 text-center">
                      <button className="btn btn-light mr-2 mb-2 heart">
                        <Heart /> Likes
                      </button>
                      <button className="btn btn-light mr-2 mb-2 control_point">
                        <MdControlPoint /> Collect
                      </button>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-2 download_item_bg">
                      <button
                        className="btn download w-100"
                        onClick={this.props.toggleDropMenuPhotoPage}
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
                  <MediaPlayer/>
                  <span
                    className="arrow_left"
                    onClick={() => {
                      this.props.toggleBtnMediaPlayer(false)
                      this.props.stopMediaPlayer()
                      this.props.watchingVideoBack(id[0])
                    }}
                  >
                    <IoIosArrowBack />
                  </span>
                  <span
                    className="arrow_right"
                    onClick={() => {
                      this.props.toggleBtnMediaPlayer(false)
                      this.props.stopMediaPlayer()
                      this.props.watchingVideoForward(id[0])
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
  data: state.products.videos,
  id: state.products.modalWindowVideoPage.id,
  isOpen: state.products.modalWindowVideoPage.isOpen,
  isScrollTop: state.products.isScrollTop,
  isOpenDropDownMenu: state.products.modalWindowVideoPage.isOpenDropDownMenu,
  videoID: state.products.modalWindowVideoPage.videoID,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleWindowVideoPage: () => dispatch(toggleWindowVideoPage()),
    toggleDropMenuPhotoPage: () => dispatch(toggleDropMenuPhotoPage()),
    toggleBtnMediaPlayer: (value:boolean)=>dispatch(toggleBtnMediaPlayer(value)),
    stopMediaPlayer: ()=>dispatch(stopMediaPlayer()),
    watchingVideoForward: (id:number)=>dispatch(watchingVideoForward(id)),
    watchingVideoBack: (id:number)=>dispatch(watchingVideoBack(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalVideoPage);
