import * as React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdControlPoint } from "react-icons/md";
import { connect } from "react-redux";
import { toggleModalWindow } from "../../../Actions/ModalWindowActions";
import { IApplicationState } from "../../../Store/Store";
import "./ModalWindow.scss";

export interface IModalWindowProps {
  toggleModalWindow: typeof toggleModalWindow;
  isModalWindowOpen: boolean;
  data: null | any;
}

export interface IModalWindowState {}

class ModalWindow extends React.Component<
  IModalWindowProps,
  IModalWindowState
> {
  public render() {
    const { isModalWindowOpen, data } = this.props;

    return (
      isModalWindowOpen &&
      data! && (
        <div className="modal-overlay">
          <button
            className="modal-close-btn"
            onClick={() => this.props.toggleModalWindow(false, null)}
          >
            &#10799;
          </button>
          <div className="modal-window-bg">
            <div className="modal-window-title">
              <div className="modal-window-title-header">
                <small>
                  {data.photographer! ? "photographer" : "videographer"}
                </small>
              </div>
              <div className="modal-window-title-left">
                <span>
                  {data.photographer!
                    ? data.photographer.charAt(0)
                    : data.videographer.charAt(0)}
                </span>
                <h5>
                  {data.photographer! ? data.photographer : data.videographer}
                </h5>
              </div>
              <div className="modal-window-title-right">
                <div className="modal-window-title-buttons-group">
                  <button>Heart</button>
                  <button>
                    <MdControlPoint /> Collect
                  </button>
                  <button>Free download</button>
                </div>
              </div>
            </div>
            <div className="modal-window-content">
              {data.photographer! && <img src={data.src} alt="img" />}
              {data.photographer === null && (
                <video>
                  <source src={data.src} type="video/mp4" />
                </video>
              )}
              <span className="modal-window-arrow-left">
                <IoIosArrowBack />
              </span>
              <span className="modal-window-arrow-right">
                <IoIosArrowForward />
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
  data: state.modalWindow.data,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleModalWindow: (value: boolean, elem: any | null) =>
      dispatch(toggleModalWindow(value, elem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);
