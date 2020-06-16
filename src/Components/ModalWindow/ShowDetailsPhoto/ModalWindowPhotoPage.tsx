import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import { ICuratedPhoto } from "../../../Interfaces/Interfaces";
import "./ModalWindowPhotoPage.scss";
import Heart from "../../SVGIcons/Heart/Heart";
import { MdControlPoint, MdClose } from "react-icons/md";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { toggleWindowPhotoPage } from "../../../Actions/ProductsActions";

export interface IWindowPhotoPageProps {
  data: ICuratedPhoto | null;
  id: number | null;
  isOpen: boolean;
  toggleWindowPhotoPage: typeof toggleWindowPhotoPage;
  isScrollTop: number | null;
}

export interface State {}

class ModalWindowPhotoPage extends React.Component<
  IWindowPhotoPageProps,
  State
> {
  public render() {
    const id = this.props.id!;

    return (
      <React.Fragment>
        {this.props.data! ? (
          <div
            className={
              this.props.isOpen ? "d-block modal_window_photo_basis" : "d-none"
            }
            style={{ top: this.props.isScrollTop! }}
          >
            <div className="container-xl">
              <div className="row modal_window_photo_bg">
                <MdClose
                  className="close_icon"
                  onClick={this.props.toggleWindowPhotoPage}
                />
                <div className="col-12 description_photo">
                  <div className="row">
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-2">
                      <p>
                        {this.props.data!.photos[id].photographer}
                      </p>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-2">
                      <button className="btn btn-light mr-2">
                        <Heart /> Likes
                      </button>
                      <button className="btn btn-light mr-2">
                        <MdControlPoint
                          className="control_point"
                          style={{
                            color: "white",
                            fontSize: "1.5rem",
                            marginRight: ".5rem",
                            fill: "black",
                          }}
                        />
                        Collect
                      </button>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 mb-2">
                    <div className="btn-group w-100">
                        <button className="btn btn-success">
                          Free download
                        </button>
                        <button className="btn btn-success dropdown-toggle dropdown-toggle-split" />
                        <div className="dropdown-menu">
                          <span className="dropdown-item">Original</span>
                          <span className="dropdown-item">Large</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 modal_window_photo">
                  <img src={this.props.data!.photos[id].src.medium} alt="img" />
                  <span className="arrow_left">
                    <IoIosArrowBack
                      style={{
                        fontSize: "3rem",
                        strokeWidth: "1rem",
                      }}
                    />
                  </span>
                  <span className="arrow_right">
                    <IoIosArrowForward
                      style={{
                        fontSize: "3rem",
                        strokeWidth: "1rem",
                      }}
                    />
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
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleWindowPhotoPage: () => dispatch(toggleWindowPhotoPage()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWindowPhotoPage);
