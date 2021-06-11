import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import {
  getPopularImages,
  getSearchVideos,
  downloadImage,
  getIdPhoto,
  toggleWindowPhotoPage,
  clearKeyPressNumber,
} from "../Actions/ProductsActions";
import { handleSearchChange } from "../Actions/ProductsActions";
import { getSearchImages } from "../Actions/ProductsActions";
import { ICuratedPhoto } from "../Interfaces/Interfaces";
import "./PhotosPage.scss";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import NavigationPages from "../Components/NavigationPages/NavigationPages";
import HeaderPhotoPage from "./HeaderPhotoPage/HeaderPhotoPage";
import { MdControlPoint } from "react-icons/md";
import Heart from "../Components/SVGIcons/Heart/Heart";
import DownloadIcon from "../Components/SVGIcons/DownloadIcon/DownloadIcon";
import ModalPhotoPage from "../Components/ModalWindow/ModalPhotoPage/ModalPhotoPage";
import Footer from "../Components/Footer/Footer";
import AuthModalWindow from "../Components/Account/AuthModalWindow/AuthModalWindow";
import MainPhotoPage from "./MainPhotoPage/MainPhotoPage";

export interface IPhotosPageProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
  getIdPhoto: typeof getIdPhoto;
  toggleWindowPhotoPage: typeof toggleWindowPhotoPage;
  getSearchVideos: typeof getSearchVideos;
  getSearchImages: typeof getSearchImages;
  clearKeyPressNumber: typeof clearKeyPressNumber;
  handleSearchChange: typeof handleSearchChange;
  downloadImage: typeof downloadImage;
  isScrollTop: number | null;
  isScrollHeight: number | null;
  isClientHeight: number | null;
  isScrolling: boolean;
  keyboardKey: number | null;
  isLoadingPopularImages: boolean;
}

class PhotosPage extends React.Component<IPhotosPageProps, {}> {

  public componentDidMount() {
    const { data } = this.props;
    if (data === null) {
      this.props.getPopularImages();
    }
  }

  public render() {
    const { isLoadingPopularImages, data } = this.props;

    return (
      <>
        <HeaderPhotoPage />
        <ModalPhotoPage />
        <AuthModalWindow />
        <MainPhotoPage />
        <NavigationPages /> 
        {!isLoadingPopularImages ? (
          <div className="container-xl trending_photos">
            <div className="row">
              <div className="col-12">
                <h6>Trending Free Stock Photos</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {data !== null &&
                    data.photos.map(
                      (image, i) =>
                        i % 2 !== 0 && (
                          <div key={i} className="col-12">
                            <div className="info-for-image">
                              <img
                                onClick={() => {
                                  this.props.getIdPhoto(image.id);
                                  this.props.toggleWindowPhotoPage();
                                }}
                                src={image.src.large}
                                alt={`img_${i}`}
                                crossOrigin="anonymous"
                              />
                              <div className="image-photographer">
                                <p>
                                  {image.photographer}
                                  {image.id}
                                </p>
                              </div>
                              <span>
                                <a
                                  download={true}
                                  onClick={(e) =>
                                    this.props.downloadImage(e.currentTarget)
                                  }
                                >
                                  <DownloadIcon />
                                </a>
                              </span>
                              <span>
                                <MdControlPoint />
                              </span>
                              <span>
                                <Heart
                                  id={image.id}
                                  src={image.src.large}
                                  photographer={image.photographer}
                                  videographer={null}
                                  liked={false}
                                />
                              </span>
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {data !== null &&
                    data.photos.map(
                      (image, i) =>
                        i % 2 === 0 && (
                          <div key={i} className="col-12">
                            <div className="info-for-image">
                              <img
                                src={image.src.large}
                                alt={`img_${i}`}
                                crossOrigin="anonymous"
                                onClick={() => {
                                  this.props.getIdPhoto(image.id);
                                  this.props.toggleWindowPhotoPage();
                                }}
                              />
                              <div className="image-photographer">
                                <p>{image.photographer}</p>
                              </div>
                              <span>
                                <a
                                  download={true}
                                  onClick={(e) =>
                                    this.props.downloadImage(e.currentTarget)
                                  }
                                >
                                  <DownloadIcon />
                                </a>
                              </span>
                              <span>
                                <MdControlPoint />
                              </span>
                              <span>
                                <Heart
                                  id={image.id}
                                  src={image.src.large}
                                  photographer={image.photographer}
                                  videographer={null}
                                  liked={false}
                                />
                              </span>
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingPage />
        )}
        <Footer/>
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  data: state.products.data,
  isScrollTop: state.products.isScrollTop,
  isScrollHeight: state.products.isScrollHeight,
  isClientHeight: state.products.isClientHeight,
  isScrolling: state.products.isScrolling,
  keyboardKey: state.products.keyboardKey,
  isLoadingPopularImages: state.products.isLoadingPopularImages
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    getPopularImages: () => dispatch(getPopularImages()),
    clearKeyPressNumber: () => dispatch(clearKeyPressNumber()),
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(handleSearchChange(e)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    downloadImage: (elem: any) => dispatch(downloadImage(elem)),
    getIdPhoto: (id: number) => dispatch(getIdPhoto(id)),
    toggleWindowPhotoPage: () => dispatch(toggleWindowPhotoPage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
