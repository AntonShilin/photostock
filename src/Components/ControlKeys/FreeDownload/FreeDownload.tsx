import * as React from "react";
import { connect } from "react-redux";
import "./FreeDownload.scss";
import { IApplicationState } from "../../../Store/Store";
import { toggleAuthModalWindow } from "../../../Actions/AccountActions";
import { toggleDropMenuPhotoPage } from "../../../Actions/ProductsActions";
import DropMenuPhotoPage from "../DropMenuPhotoPage/DropMenuPhotoPage";

export interface IFreeDownloadProps {
  toggleAuthModalWindow: typeof toggleAuthModalWindow;
  isAccountSignIn: boolean;
  isOpenDropDownMenu: boolean;
  toggleDropMenuPhotoPage: typeof toggleDropMenuPhotoPage;
}

export interface IFreeDownloadState {}

class FreeDownload extends React.Component<
  IFreeDownloadProps,
  IFreeDownloadState
> {
  public render() {
    const {  isAccountSignIn, isOpenDropDownMenu,  } = this.props;

    return (
        <button
          className="btn-download"
          onClick={() => {
            if (!isAccountSignIn) {
              this.props.toggleAuthModalWindow(true);
            } else {
              this.props.toggleDropMenuPhotoPage();
            }
          }}
        >
          Free Download
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width="1.6em"
            height="1.3em"
          >
            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
          </svg>
        </button>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  isAccountSignIn: state.account.isAccountSignIn,
  isOpenDropDownMenu: state.products.modalWindowPhotoPage.isOpenDropDownMenu,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleAuthModalWindow: (value: boolean) =>
      dispatch(toggleAuthModalWindow(value)),
    toggleDropMenuPhotoPage: () => dispatch(toggleDropMenuPhotoPage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FreeDownload);
