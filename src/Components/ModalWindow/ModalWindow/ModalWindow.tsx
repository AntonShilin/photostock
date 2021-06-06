import * as React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { connect } from "react-redux";
import {
  toggleModalWindow,
  viewNext,
  viewPreviously,
} from "../../../Actions/ModalWindowActions";
import { IApplicationState } from "../../../Store/Store";
import ButtonLike from "../../ControlKeys/ButtonLike/ButtonLike";
import Collect from "../../ControlKeys/Collect/Collect";
import FreeDownload from "../../ControlKeys/FreeDownload/FreeDownload";
import Player from "../../MediaPlayers/Player/Player";
import "./ModalWindow.scss";

export interface IModalWindowProps {
  toggleModalWindow: typeof toggleModalWindow;
  isModalWindowOpen: boolean;
  collection: any[] | null;
  viewedId: number;
  viewNext: typeof viewNext;
  viewPreviously: typeof viewPreviously;
}

export interface IModalWindowState {}

class ModalWindow extends React.Component<
  IModalWindowProps,
  IModalWindowState
> {
  public render() {
    const { isModalWindowOpen, collection, viewedId } = this.props;

    return (
      isModalWindowOpen &&
      collection !== null && (
        <div className="modal-overlay">
          <button
            className="modal-close-btn"
            onClick={() => this.props.toggleModalWindow(false, 0, null)}
          >
            &#10799;
          </button>
          <div className="modal-window-bg">
            <div className="modal-window-title">
              <div className="modal-window-title-header">
                <small>
                  {collection[viewedId].photographer !== null
                    ? "photographer"
                    : "videographer"}
                </small>
              </div>
              <div className="modal-window-title-left">
                <span>
                  {collection[viewedId].photographer !== null
                    ? collection[viewedId].photographer.charAt(0)
                    : collection[viewedId].videographer.charAt(0)}
                </span>
                <h5>
                  {collection[viewedId].photographer !== null
                    ? collection[viewedId].photographer
                    : collection[viewedId].videographer}
                </h5>
              </div>
              <div className="modal-window-title-right">
                <div className="modal-window-title-buttons-group">
                  <ButtonLike
                    id={collection[viewedId].id}
                    src={collection[viewedId].src}
                    photographer={collection[viewedId].photographer}
                    videographer={collection[viewedId].videographer}
                    liked={true}
                  />
                  <Collect
                    id={collection[viewedId].id}
                    src={collection[viewedId].src}
                    photographer={collection[viewedId].photographer}
                    videographer={collection[viewedId].videographer}
                    liked={true}
                  />
                  <FreeDownload />
                </div>
              </div>
            </div>
            <div className="modal-window-content">
              {collection[viewedId].photographer !== null && (
                <img src={collection[viewedId].src} alt="img" />
              )}
              {collection[viewedId].photographer === null && (
                <Player src={collection[viewedId].src} />
              )}
              <span
                className="modal-window-arrow-left"
                onClick={this.props.viewPreviously}
              >
                <IoIosArrowBack />
              </span>
              <span className="modal-window-arrow-right">
                <IoIosArrowForward onClick={this.props.viewNext} />
              </span>
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  isModalWindowOpen: state.modalWindow.isModalWindowOpen,
  collection: state.modalWindow.collection,
  viewedId: state.modalWindow.viewedId,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleModalWindow: (value: boolean, id: number, collection: any[] | null) =>
      dispatch(toggleModalWindow(value, id, collection)),
    viewNext: () => dispatch(viewNext()),
    viewPreviously: () => dispatch(viewPreviously()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
