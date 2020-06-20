import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IDataSearch, IPopularVideos } from "../Interfaces/Interfaces";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../Components/LoadingPage/LoadingPage";
import { getSearchImages, getSearchVideos, downloadImage } from "../Actions/ProductsActions";
import HeaderResultPhotoPage from "./HeaderResultPhotoPage/HeaderResultPhotoPage";
import "./ResultPhotoPage.scss";
import { MdControlPoint } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa";
import CouldnotFindPhoto from "../Components/CouldnotFindPhoto/CouldnotFindPhoto";
import Heart from "../Components/SVGIcons/Heart/Heart";
import DownloadIcon from "../Components/SVGIcons/DownloadIcon/DownloadIcon";

export interface IDataResult extends RouteComponentProps {
  getSearchImages: typeof getSearchImages;
  resultSearchImage: IDataSearch | null;
  searchNamePhoto: string;
  resultSearchVideo: IPopularVideos | null;
  getSearchVideos: typeof getSearchVideos;
  downloadImage: typeof downloadImage;
  isLoadingImages: boolean;
}

class ResultPhotoPage extends React.Component<IDataResult> {
  public render() {
    return (
      <React.Fragment>
        <HeaderResultPhotoPage />
        {this.props.isLoadingImages ? (
          <LoadingPage />
        ) : (
          <div className="container-xl">
            <div className="photo-result-bages row align-items-center justify-content-md-center mt-3 mb-5">
              <div className="col-auto">
                <ul className="list-group list-group-horizontal">
                  <li className="list-group-item">
                    <NavLink activeClassName="photo-result-bages-active" to="#">
                      <FaRegImage /> Photos
                      <span className="ml-1">
                        {this.props.resultSearchImage === null
                          ? 0
                          : this.props.resultSearchImage.photos.length}
                      </span>
                    </NavLink>
                  </li>
                  <li className="list-group-item">
                    <NavLink
                      activeClassName="photo-result-bages-active"
                      to={`/videos/${this.props.searchNamePhoto}`}
                    >
                      <FaVideo /> Videos
                      <span className="ml-1">
                        {this.props.resultSearchVideo === null
                          ? 0
                          : this.props.resultSearchVideo.videos.length}
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <CouldnotFindPhoto />
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {this.props.resultSearchImage === null
                    ? null
                    : this.props.resultSearchImage.photos.map((image, i) =>
                        i % 2 ? (
                          <div key={i} className="col-12">
                            <div className="info-for-image">
                              <img
                                src={image.src.large}
                                alt={`img_${i}`}
                                crossOrigin="anonymous"
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
                                <MdControlPoint
                                  style={{ color: "white", fontSize: "1.5rem" }}
                                />
                              </span>
                              <span>
                                <Heart />
                              </span>
                            </div>
                          </div>
                        ) : null
                      )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {this.props.resultSearchImage === null
                    ? null
                    : this.props.resultSearchImage.photos.map((image, i) =>
                        i % 2 === 0 ? (
                          <div key={i} className="col-12">
                            <div className="info-for-image">
                              <img
                                src={image.src.large}
                                alt={`img_${i}`}
                                crossOrigin="anonymous"
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
                                <MdControlPoint
                                  style={{ color: "white", fontSize: "1.5rem" }}
                                />
                              </span>
                              <span>
                                <Heart />
                              </span>
                            </div>
                          </div>
                        ) : null
                      )}
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPhotoPage);
