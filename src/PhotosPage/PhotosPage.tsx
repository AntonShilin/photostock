import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import NavigationPages from "../Components/NavigationPages/NavigationPages";
import HeaderPhotoPage from "./HeaderPhotoPage/HeaderPhotoPage";
import ModalPhotoPage from "../Components/ModalWindow/ModalPhotoPage/ModalPhotoPage";
import Footer from "../Components/Footer/Footer";
import AuthModalWindow from "../Components/Account/AuthModalWindow/AuthModalWindow";
import MainPhotoPage from "./MainPhotoPage/MainPhotoPage";
import TrendingPhotos from "./TrendingPhotos/TrendingPhotos";

export interface IPhotosPageProps {
  isLoadingPopularImages: boolean;
}

class PhotosPage extends React.Component<IPhotosPageProps, {}> {

  public render() {
    const { isLoadingPopularImages } = this.props;

    return (
      <>
        <HeaderPhotoPage />
        <ModalPhotoPage />
        <AuthModalWindow />
        <MainPhotoPage />
        <NavigationPages />
        {!isLoadingPopularImages ? <TrendingPhotos /> : <LoadingPage />}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  isLoadingPopularImages: state.products.isLoadingPopularImages,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
