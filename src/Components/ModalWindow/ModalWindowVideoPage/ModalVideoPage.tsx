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
} from "../../../Actions/ProductsActions";
import MediaPlayer from "./MediaPlayer/MediaPlayer";

export interface IWindowVideoPageProps {
  data: IPopularVideos | null;
  id: number | null;
  isOpen: boolean;
  isScrollTop: number | null;
  isOpenDropDownMenu: boolean;
  toggleWindowVideoPage: typeof toggleWindowVideoPage;
  toggleDropMenuPhotoPage: typeof toggleDropMenuPhotoPage;
}

export interface State {}

class ModalVideoPage extends React.Component<IWindowVideoPageProps, State> {
  public render() {
    const { isOpenDropDownMenu, data, id } = this.props;
    
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
                  onClick={() => this.props.toggleWindowVideoPage()}
                />
                <div className="col-12 description_video">
                  <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-2">
                      <p className="text-center">
                        {id! && data!.videos[id!].user.name}
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
                  >
                    <IoIosArrowBack />
                  </span>
                  <span
                    className="arrow_right"
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
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleWindowVideoPage: () => dispatch(toggleWindowVideoPage()),
    toggleDropMenuPhotoPage: () => dispatch(toggleDropMenuPhotoPage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalVideoPage);
