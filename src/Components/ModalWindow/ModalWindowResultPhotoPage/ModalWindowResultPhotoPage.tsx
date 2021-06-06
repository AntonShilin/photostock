import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import { IDataSearch } from "../../../Interfaces/Interfaces";
import "./ModalWindowResultPhotoPage.scss";
import { MdControlPoint } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  toggleWindowPhotoPage,
  watchingImageForward,
  watchingImageBack,
  toggleDropMenuPhotoPage,
  clearPhotoID,
} from "../../../Actions/ProductsActions";
import DropMenuResultPhotoPage from "./DropMenuResultPhotoPage/DropMenuResultPhotoPage";
import ButtonLike from "../../ControlKeys/ButtonLike/ButtonLike";
import FreeDownload from "../../ControlKeys/FreeDownload/FreeDownload";
import Collect from "../../ControlKeys/Collect/Collect";

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
    const { isOpenDropDownMenu, resultSearchImage, isOpen } = this.props;

    return (
      <>
        {resultSearchImage !== null && isOpen && (
          <div className="modal-photo-result">
            <button
              className="modal-close-btn"
              onClick={() => {
                this.props.toggleWindowPhotoPage();
                this.props.clearPhotoID();
              }}
            >
              &#10799;
            </button>
            <div className="modal-photo-result-bg">
              <div className="modal-photo-result-title">
                <div className="modal-photo-result-title-header">
                  <small>photographer</small>
                </div>
                <div className="modal-photo-result-title-left">
                  <span>
                    {resultSearchImage.photos[id].photographer.charAt(0)}
                  </span>
                  <h5>{resultSearchImage.photos[id].photographer}</h5>
                </div>
                <div className="modal-photo-result-title-right">
                  <div className="modal-photo-result-title-buttons-group">
                    <ButtonLike
                      id={resultSearchImage.photos[id].id}
                      src={resultSearchImage.photos[id].src.medium}
                      photographer={resultSearchImage.photos[id].photographer}
                      videographer={null}
                      liked={false}
                    />
                    <Collect
                      id={resultSearchImage.photos[id].id}
                      src={resultSearchImage.photos[id].src.medium}
                      photographer={resultSearchImage.photos[id].photographer}
                      videographer={null}
                      liked={false}
                    />
                    <FreeDownload/>
                  </div>
                </div>
              </div>
              <div className="modal-photo-result-content">
                <img src={resultSearchImage.photos[id].src.medium} alt="img" />
                <span
                  className="modal-photo-result-arrow-left"
                  onClick={() => this.props.watchingImageBack(id)}
                >
                  <IoIosArrowBack />
                </span>
                <span className="modal-photo-result-arrow-right">
                  <IoIosArrowForward
                    onClick={() => this.props.watchingImageForward(id)}
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
