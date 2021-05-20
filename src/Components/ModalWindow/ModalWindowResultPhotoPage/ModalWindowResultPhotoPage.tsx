import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import { IDataSearch } from "../../../Interfaces/Interfaces";
import "./ModalWindowResultPhotoPage.scss";
import Heart from "../../SVGIcons/Heart/Heart";
import { MdControlPoint, MdClose } from "react-icons/md";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowUp,
} from "react-icons/io";
import {
  toggleWindowPhotoPage,
  watchingImageForward,
  watchingImageBack,
  toggleDropMenuPhotoPage,
  clearPhotoID,
} from "../../../Actions/ProductsActions";
import DropMenuResultPhotoPage from "./DropMenuResultPhotoPage/DropMenuResultPhotoPage";

export interface IWindowResultPhotoPageProps {
  resultSearchImage: IDataSearch | null;
  id: number | null;
  isOpen: boolean;
  isScrollTop: number | null;
  isOpenDropDownMenu: boolean;
  toggleWindowPhotoPage: typeof toggleWindowPhotoPage;
  watchingImageForward: typeof watchingImageForward;
  watchingImageBack: typeof watchingImageBack;
  toggleDropMenuPhotoPage: typeof toggleDropMenuPhotoPage;
  clearPhotoID: typeof clearPhotoID;
}

export interface State {}

class ModalWindowResultPhotoPage extends React.Component<
  IWindowResultPhotoPageProps,
  State
> {
  public render() {
    const id = this.props.id!;
    const { isOpenDropDownMenu } = this.props;

    return (
      <React.Fragment>
        {this.props.resultSearchImage !== null ? (
          <div
            className={
              this.props.isOpen ? "d-block modal_window_photo_basis" : "d-none"
            }
          >
            <div className="container-xl">
              <div className="row modal_window_photo_bg">
                <MdClose
                  className="close_icon"
                  onClick={() => {
                    this.props.toggleWindowPhotoPage();
                    this.props.clearPhotoID();
                  }}
                />
                <div className="col-12 description_photo order-lg-first order-last">
                  <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 mb-2 order-lg-first order-last">
                      <p>
                        <small>PHOTOGRAPHER</small>
                        <span>
                          {this.props.resultSearchImage?.photos[
                            id
                          ]?.photographer.charAt(0)}
                        </span>
                        {this.props.resultSearchImage?.photos[id]?.photographer}
                      </p>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 mb-2 text-center">
                      <button className="btn btn-light mr-2 mb-2 heart">
                        <Heart
                          id={this.props.resultSearchImage!.photos[id].id}
                          src={
                            this.props.resultSearchImage!.photos[id].src.small
                          }
                        />{" "}
                        Likes
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
                        Free download{" "}
                        {isOpenDropDownMenu ? (
                          <IoIosArrowUp />
                        ) : (
                          <IoIosArrowDown />
                        )}
                      </button>
                      <DropMenuResultPhotoPage />
                    </div>
                  </div>
                </div>
                <div className="col-12 align-self-center modal_window_photo">
                  <img
                    src={this.props.resultSearchImage?.photos[id]?.src.medium}
                    alt="img"
                  />
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
  resultSearchImage: state.products.resultSearchImage,
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
    toggleDropMenuPhotoPage: () => dispatch(toggleDropMenuPhotoPage()),
    clearPhotoID: () => dispatch(clearPhotoID()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindowResultPhotoPage);
