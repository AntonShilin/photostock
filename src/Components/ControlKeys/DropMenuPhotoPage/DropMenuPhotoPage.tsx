import * as React from "react";
import { IApplicationState } from "../../../Store/Store";
import { connect } from "react-redux";
import { ICuratedPhoto } from "../../../Interfaces/Interfaces";
import {
  getPopularImages,
  handleSelectImageSize,
  downloadSelectImageSize,
  clearEarlierSize,
  clearRadioBoxes,
} from "../../../Actions/ProductsActions";
import "./DropMenuPhotoPage.scss";

export interface IDropMenuPhotoPageProps {
  data: any[] | null;
  id: number | null;
  sizeURL: string | undefined;
  isOpen: boolean;
  getPopularImages: typeof getPopularImages;
  handleSelectImageSize: typeof handleSelectImageSize;
  downloadSelectImageSize: typeof downloadSelectImageSize;
  clearEarlierSize: typeof clearEarlierSize;
  clearRadioBoxes: typeof clearRadioBoxes;
  isOpenDropDownMenu: boolean;
}

export interface State {}

class DropMenuPhotoPage extends React.Component<
  IDropMenuPhotoPageProps,
  State
> {
  private inputs: HTMLInputElement[];

  constructor(props: IDropMenuPhotoPageProps) {
    super(props);
    this.inputs = [];
  }

  public render() {
    const { id, isOpenDropDownMenu, sizeURL } = this.props;
    const sizes = "";

    return this.props.data!==undefined ? (
      <form
        className={
          isOpenDropDownMenu ? "d-block dropmenu_photo_page" : "d-none"
        }
      >
        <p className="text-center">Choose a size:</p>
        {Object.entries(sizes!).map(([key, value]) => (
          <div className="form-check" key={key}>
            <label className="form-check-label" htmlFor={key}>
              <input
                required={true}
                ref={this.setRef}
                type="radio"
                className="form-check-input"
                name="optradio"
                id={key}
                value={value}
                onChange={(event) => {
                  this.props.handleSelectImageSize(event.target.value);
                }}
              />
              {key}
            </label>
          </div>
        ))}
        <span
          className="btn"
          onClick={(e) => {
            if (typeof sizeURL === "string") {
              this.props.downloadSelectImageSize(e.currentTarget, sizeURL);
              this.props.clearEarlierSize();
              this.props.clearRadioBoxes(this.inputs);
            }
          }}
        >
          Free download
        </span>
      </form>
    ) : null;
  }

  private setRef = (node: HTMLInputElement) => {
    this.inputs.push(node);
  };
}

const mapStateToProps = (state: IApplicationState) => ({
  sizeURL: state.products.modalWindowPhotoPage.sizeURL,
  isOpen: state.products.modalWindowPhotoPage.isOpen,
  isOpenDropDownMenu: state.products.modalWindowPhotoPage.isOpenDropDownMenu,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPopularImages: () => dispatch(getPopularImages()),
    clearEarlierSize: () => dispatch(clearEarlierSize()),
    clearRadioBoxes: (inputs: any) => dispatch(clearRadioBoxes(inputs)),
    handleSelectImageSize: (size: string) =>
      dispatch(handleSelectImageSize(size)),
    downloadSelectImageSize: (elem: any, sizeURL: string) =>
      dispatch(downloadSelectImageSize(elem, sizeURL)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropMenuPhotoPage);
