import * as React from "react";
import { IApplicationState } from "../../../../Store/Store";
import { connect } from "react-redux";
import { IPopularVideos } from "../../../../Interfaces/Interfaces";
import {
  downloadSelectImageSize,
  clearEarlierSize,
  clearRadioBoxes,
  handleSelectVideoSize,
} from "../../../../Actions/ProductsActions";
import "./DropMenuVideoPage.scss";

export interface IDropMenuVideoPageProps {
  data: IPopularVideos | null;
  id: number[];
  sizeURL: string | undefined;
  isOpen: boolean;
  handleSelectVideoSize: typeof handleSelectVideoSize;
  downloadSelectImageSize: typeof downloadSelectImageSize;
  clearEarlierSize: typeof clearEarlierSize;
  clearRadioBoxes: typeof clearRadioBoxes;
  isOpenDropDownMenu: boolean;
}

export interface State {}

class DropMenuVideoPage extends React.Component<
  IDropMenuVideoPageProps,
  State
> {
  private inputs: HTMLInputElement[];

  constructor(props: IDropMenuVideoPageProps) {
    super(props);
    this.inputs = [];
  }

  public render() {
    const { id, isOpenDropDownMenu, sizeURL } = this.props;
    const sizes = this.props.data!.videos[id[0]].video_files;

    return this.props.data !== undefined ? (
      <form
        className={
          isOpenDropDownMenu ? "d-block dropmenu_video_page" : "d-none"
        }
      >
        <p className="text-center">Choose a size:</p>
        {sizes!.map((value, i) => (
          <div className="form-check" key={i}>
            <label className="form-check-label" htmlFor={i.toString()}>
              <input
                required={true}
                ref={this.setRef}
                type="radio"
                className="form-check-input"
                name="optradio"
                id={i.toString()}
                value={value.link}
                onChange={(event) => {
                  this.props.handleSelectVideoSize(event.target.value);
                }}
              />
              {value.quality} ({value.width}x{value.height})
            </label>
          </div>
        ))}
        <span
          className="btn"
          onClick={(e) => {
            if (typeof sizeURL === "string") {
              //   this.props.downloadSelectImageSize(e.currentTarget, sizeURL);
              //   this.props.clearEarlierSize();
              //   this.props.clearRadioBoxes(this.inputs);
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
  data: state.products.videos,
  id: state.products.modalWindowVideoPage.id,
  sizeURL: state.products.modalWindowVideoPage.sizeURL,
  isOpen: state.products.modalWindowVideoPage.isOpen,
  isOpenDropDownMenu: state.products.modalWindowVideoPage.isOpenDropDownMenu,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearEarlierSize: () => dispatch(clearEarlierSize()),
    clearRadioBoxes: (inputs: any) => dispatch(clearRadioBoxes(inputs)),
    handleSelectVideoSize: (size: string) =>
      dispatch(handleSelectVideoSize(size)),
    downloadSelectImageSize: (elem: any, sizeURL: string) =>
      dispatch(downloadSelectImageSize(elem, sizeURL)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropMenuVideoPage);
