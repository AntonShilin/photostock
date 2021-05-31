import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IDataSearch, IPopularVideos } from "../Interfaces/Interfaces";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import {
  getSearchImages,
  getSearchVideos,
  downloadImage,
  toggleWindowPhotoPage,
  getIdPhoto,
} from "../Actions/ProductsActions";
import HeaderResultPhotoPage from "./HeaderResultPhotoPage/HeaderResultPhotoPage";
import "./ResultPhotoPage.scss";
import { MdControlPoint } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import CouldnotFindPhoto from "../Components/CouldnotFindPhoto/CouldnotFindPhoto";
import Heart from "../Components/SVGIcons/Heart/Heart";
import DownloadIcon from "../Components/SVGIcons/DownloadIcon/DownloadIcon";
import ModalWindowResultPhotoPage from "../Components/ModalWindow/ModalWindowResultPhotoPage/ModalWindowResultPhotoPage";
import Footer from "../Components/Footer/Footer";

export interface IDataResult extends RouteComponentProps {
  getSearchImages: typeof getSearchImages;
  resultSearchImage: IDataSearch | null;
  searchNamePhoto: string;
  resultSearchVideo: IPopularVideos | null;
  getSearchVideos: typeof getSearchVideos;
  downloadImage: typeof downloadImage;
  isLoadingImages: boolean;
  getIdPhoto: typeof getIdPhoto;
  toggleWindowPhotoPage: typeof toggleWindowPhotoPage;
}

class ResultPhotoPage extends React.Component<IDataResult> {
  public render() {
    const {
      isLoadingImages,
      resultSearchImage,
      searchNamePhoto,
      resultSearchVideo,
    } = this.props;

    return (
      <>
        <HeaderResultPhotoPage />
        <ModalWindowResultPhotoPage />
        {isLoadingImages ? (
          <LoadingPage />
        ) : (
          <>
            <div className="container-xl photo_result_bg">
              <div className="row photo-result-bages">
                <div className="col">
                  <div className="photo-result-navigation">
                    <NavLink activeClassName="photo-result-bages-active" to="#">
                      <FaRegImage /> Photos
                      <span>
                        {resultSearchImage === null
                          ? 0
                          : resultSearchImage.photos.length}
                      </span>
                    </NavLink>
                    <NavLink
                      activeClassName="photo-result-bages-active"
                      to={`/videos/${searchNamePhoto}`}
                    >
                      <FaVideo /> Videos
                      <span className="ml-1">
                        {resultSearchVideo === null
                          ? 0
                          : resultSearchVideo.videos.length}
                      </span>
                    </NavLink>
                  </div>
                </div>
              </div>
              <CouldnotFindPhoto />
              <div className="row photo-result-search">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    {this.props.resultSearchImage !== null &&
                      this.props.resultSearchImage.photos.map(
                        (image, i) =>
                          i % 2 !== 0 && (
                            <div key={i} className="col-12">
                              <div className="result-info-for-image">
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
                    {this.props.resultSearchImage !== null &&
                      this.props.resultSearchImage.photos.map(
                        (image, i) =>
                          i % 2 === 0 && (
                            <div key={i} className="col-12">
                              <div className="result-info-for-image">
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
            <Footer/>
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    resultSearchImage: state.products.resultSearchImage,
    searchNamePhoto: state.products.searchNamePhoto,
    resultSearchVideo: state.products.resultSearchVideo,
    isLoadingImages: state.products.isLoadingImages,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    downloadImage: (elem: any) => dispatch(downloadImage(elem)),
    getIdPhoto: (id: number) => dispatch(getIdPhoto(id)),
    toggleWindowPhotoPage: () => dispatch(toggleWindowPhotoPage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPhotoPage);
