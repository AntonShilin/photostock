import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { RouteComponentProps} from "react-router-dom";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import HeaderResultPhotoPage from "./HeaderResultPhotoPage/HeaderResultPhotoPage";
import ModalWindowResultPhotoPage from "../Components/ModalWindow/ModalWindowResultPhotoPage/ModalWindowResultPhotoPage";
import Footer from "../Components/Footer/Footer";
import AuthModalWindow from "../Components/Account/AuthModalWindow/AuthModalWindow";
import ResultSearchPhotos from "./ResultSearchPhotos/ResultSearchPhotos";

export interface ISearchImageResultProps extends RouteComponentProps {
  isLoadingSearchImagesByName: boolean;
}

class ResultPhotoPage extends React.Component<ISearchImageResultProps, {}> {

  public render() {
    const {
      isLoadingSearchImagesByName,
    } = this.props;

    return (
      <>
        <HeaderResultPhotoPage />
        <ModalWindowResultPhotoPage />
        <AuthModalWindow />
        {isLoadingSearchImagesByName ? (
          <LoadingPage />
        ) : (
          <ResultSearchPhotos />
        )}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    isLoadingSearchImagesByName: state.products.isLoadingSearchImagesByName,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPhotoPage);

