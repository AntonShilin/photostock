import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import { ICuratedPhoto } from "../../../Interfaces/Interfaces";
import "./ModalPhotoPage.scss";
import { MdControlPoint } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import {
  toggleWindowPhotoPage,
  toggleDropMenuPhotoPage,
  watchingPopularImageForward,
  watchingPopularImageBack,
  clearPhotoID,
} from "../../../Actions/ProductsActions";
import DropMenuPhotoPage from "../../ControlKeys/DropMenuPhotoPage/DropMenuPhotoPage";
import ButtonLike from "../../ControlKeys/ButtonLike/ButtonLike";
import FreeDownload from "../../ControlKeys/FreeDownload/FreeDownload";
import Collect from "../../ControlKeys/Collect/Collect";

export interface IWindowPhotoPageProps {
  data: ICuratedPhoto | null;
  id: number | null;
  isOpen: boolean;
  isScrollTop: number | null;
  isOpenDropDownMenu: boolean;
  toggleWindowPhotoPage: typeof toggleWindowPhotoPage;
  watchingPopularImageForward: typeof watchingPopularImageForward;
  watchingPopularImageBack: typeof watchingPopularImageBack;
  toggleDropMenuPhotoPage: typeof toggleDropMenuPhotoPage;
  clearPhotoID: typeof clearPhotoID;
}

export interface State {}

class ModalWindowPhotoPage extends React.Component<
  IWindowPhotoPageProps,
  State
> {
  public render() {
    const id = this.props.id!;
    const { isOpenDropDownMenu, data, isOpen } = this.props;

    return (
      <>
        {data !== null && isOpen && (
          <div className="modal-photo-page">
            <button
              className="modal-close-btn"
              onClick={() => {
                this.props.toggleWindowPhotoPage();
                this.props.clearPhotoID();
              }}
            >
              &#10799;
            </button>
            <div className="modal-photo-page-bg">
              <div className="modal-photo-page-title">
                <div className="modal-photo-page-title-header">
                  <small>photographer</small>
                </div>
                <div className="modal-photo-page-title-left">
                  <span>{data.photos[id].photographer.charAt(0)}</span>
                  <h5>{data.photos[id].photographer}</h5>
                </div>
                <div className="modal-photo-page-title-right">
                  <div className="modal-photo-page-title-buttons-group">
                    <ButtonLike
                      id={data.photos[id].id}
                      src={data.photos[id].src.medium}
                      photographer={data.photos[id].photographer}
                      videographer={null}
                      liked={false}
                    />
                    <Collect
                      id={data.photos[id].id}
                      src={data.photos[id].src.medium}
                      photographer={data.photos[id].photographer}
                      videographer={null}
                      liked={false}
                    />
                    <FreeDownload />
                  </div>
                </div>
              </div>
              <div className="modal-photo-page-content">
                <img src={data.photos[id].src.medium} alt="img" />
                <span
                  className="modal-photo-page-arrow-left"
                  onClick={() => this.props.watchingPopularImageBack(id)}
                >
                  <IoIosArrowBack />
                </span>
                <span className="modal-photo-page-arrow-right">
                  <IoIosArrowForward
                    onClick={() => this.props.watchingPopularImageForward(id)}
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
  data: state.products.data,
  id: state.products.modalWindowPhotoPage.id,
  isOpen: state.products.modalWindowPhotoPage.isOpen,
  isScrollTop: state.products.isScrollTop,
  isOpenDropDownMenu: state.products.modalWindowPhotoPage.isOpenDropDownMenu,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleWindowPhotoPage: () => dispatch(toggleWindowPhotoPage()),
    watchingPopularImageForward: (id: number) =>
      dispatch(watchingPopularImageForward(id)),
    watchingPopularImageBack: (id: number) =>
      dispatch(watchingPopularImageBack(id)),
    toggleDropMenuPhotoPage: () => dispatch(toggleDropMenuPhotoPage()),
    clearPhotoID: () => dispatch(clearPhotoID()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindowPhotoPage);
