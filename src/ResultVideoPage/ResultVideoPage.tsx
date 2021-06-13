import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { RouteComponentProps } from "react-router-dom";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import HeaderResultVideoPage from "./HeaderResultVideoPage/HeaderResultVideoPage";
import ModalWindowResultVideoPage from "../Components/ModalWindow/ModalWindowResultVideoPage/ModalWindowResultVideoPage";
import Footer from "../Components/Footer/Footer";
import AuthModalWindow from "../Components/Account/AuthModalWindow/AuthModalWindow";
import ResultSearchVideos from "./ResultSearchVideos/ResultSearchVideos";

export interface IPropsResultPage extends RouteComponentProps {
  isLoadingSearchVideosByName: boolean;
}

class ResultVideoPage extends React.Component<IPropsResultPage> {
  public render() {
    const {
      isLoadingSearchVideosByName,
    } = this.props;

    return (
      <>
        <HeaderResultVideoPage />
        <ModalWindowResultVideoPage />
        <AuthModalWindow/>
        {isLoadingSearchVideosByName ? (
          <LoadingPage />
        ) : (
         <ResultSearchVideos/>
        )}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    isLoadingSearchVideosByName: state.products.isLoadingSearchVideosByName,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultVideoPage);
