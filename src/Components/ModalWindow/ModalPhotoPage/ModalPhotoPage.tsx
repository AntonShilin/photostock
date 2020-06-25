import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import { ICuratedPhoto } from "../../../Interfaces/Interfaces";
import "./ModalPhotoPage.scss";
import Heart from "../../SVGIcons/Heart/Heart";
import { MdControlPoint, MdClose } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  toggleWindowPhotoPage,
  watchingImageForward,
  watchingImageBack,
  toggleDropMenuPhotoPage,
} from "../../../Actions/ProductsActions";
import DropMenuPhotoPage from "./DropMenuPhotoPage/DropMenuPhotoPage";

export interface IWindowPhotoPageProps {
  data: ICuratedPhoto | null;
  id: number | null;
  isOpen: boolean;
  isScrollTop: number | null;
  isOpenDropDownMenu: boolean;
  toggleWindowPhotoPage: typeof toggleWindowPhotoPage;
  watchingImageForward: typeof watchingImageForward;
  watchingImageBack: typeof watchingImageBack;
  toggleDropMenuPhotoPage: typeof toggleDropMenuPhotoPage;
}

export interface State {}

class ModalWindowPhotoPage extends React.Component<
  IWindowPhotoPageProps,
  State
> {
  public render() {
    const id = this.props.id!;
    const { isOpenDropDownMenu } = this.props;

    return (
      <React.Fragment>
        {this.props.data! ? (
          <div
            className={
              this.props.isOpen ? "d-block modal_window_photo_basis" : "d-none"
            }
          >
            <div className="container-xl">
              <div className="row modal_window_photo_bg">
                <MdClose
                  className="close_icon"
                  onClick={() => this.props.toggleWindowPhotoPage()}
                />
                <div className="col-12 description_photo">
                  <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-2">
                      <p className="text-center">
                        {this.props.data!.photos[id].photographer}
                      </p>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mb-2 text-center">
                      <button className="btn btn-light mr-2 mb-2 heart">
                        <Heart /> Likes
                      </button>
                      <button className="btn btn-light mr-2 mb-2   control_point">
                        <MdControlPoint /> Collect
                      </button>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-2 download_item_bg">
                      <button
                        className="btn download w-100"
                        onClick={this.props.toggleDropMenuPhotoPage}
                      >
                        Free download {isOpenDropDownMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </button>
                      <DropMenuPhotoPage />
                    </div>
                  </div>
                </div>
                <div className="col-12 align-self-center modal_window_photo">
                  <img src={this.props.data!.photos[id].src.medium} alt="img" />
                  <span
                    className="arrow_left"
                    onClick={() => this.props.watchingImageBack(id)}
                  >
                    <IoIosArrowBack />
                  </span>
                  <span
                    className="arrow_right"
                    onClick={() => this.props.watchingImageForward(id)}
                  >
                    <IoIosArrowForward />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  data: state.products.data,
  id: state.products.modalWindowPhotoPage.id,
  isOpen: state.products.modalWindowPhotoPage.isOpen,
  isScrollTop: state.products.isScrollTop,
  isOpenDropDownMenu: state.products.modalWindowPhotoPage.isOpenDropDownMenu,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleWindowPhotoPage: () => dispatch(toggleWindowPhotoPage()),
    watchingImageForward: (id: number) => dispatch(watchingImageForward(id)),
    watchingImageBack: (id: number) => dispatch(watchingImageBack(id)),
    toggleDropMenuPhotoPage: (id: number) =>
      dispatch(toggleDropMenuPhotoPage(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindowPhotoPage);
