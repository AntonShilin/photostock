import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import "./VideosPage.scss";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import NavigationPages from "../Components/NavigationPages/NavigationPages";
import HeaderVideoPage from "./HeaderVideoPage/HeaderVideoPage";
import ModalVideoPage from "../Components/ModalWindow/ModalWindowVideoPage/ModalVideoPage";
import Footer from "../Components/Footer/Footer";
import AuthModalWindow from "../Components/Account/AuthModalWindow/AuthModalWindow";
import TrendingVideo from "./TrendingVideo/TrendingVideo";
import MainVideoPage from "./MainVideoPage/MainVideoPage";

export interface IPropsVideosPage {
  isLoadingPopularVideos: boolean;
}

class VideosPage extends React.Component<IPropsVideosPage> {
  
  public render() {
    const { isLoadingPopularVideos } = this.props;

    return (
      <>
        <HeaderVideoPage />
        <ModalVideoPage />
        <AuthModalWindow />
        <MainVideoPage/>
        <NavigationPages />
        {isLoadingPopularVideos ? <LoadingPage /> : <TrendingVideo />}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    isLoadingPopularVideos: state.products.isLoadingPopularVideos,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage);
