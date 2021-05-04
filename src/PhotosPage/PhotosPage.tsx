import * as React from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
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
import { FiSearch } from "react-icons/fi";
import NavigationPages from "../Components/NavigationPages/NavigationPages";
import HeaderPhotoPage from "./HeaderPhotoPage/HeaderPhotoPage";
import { MdControlPoint } from "react-icons/md";
import SuggestedPhotoWords from "../Components/SuggestedPhotoWords/SuggestedPhotoWords";
import Heart from "../Components/SVGIcons/Heart/Heart";
import DownloadIcon from "../Components/SVGIcons/DownloadIcon/DownloadIcon";
import ModalPhotoPage from "../Components/ModalWindow/ModalPhotoPage/ModalPhotoPage";
import Footer from "../Components/Footer/Footer";

export interface IPropsPhotosPage extends RouteComponentProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
  getIdPhoto: typeof getIdPhoto;
  toggleWindowPhotoPage: typeof toggleWindowPhotoPage;
  getSearchVideos: typeof getSearchVideos;
  searchNamePhoto: string;
  handleSearchChange: typeof handleSearchChange;
  getSearchImages: typeof getSearchImages;
  downloadImage: typeof downloadImage;
  clearKeyPressNumber: typeof clearKeyPressNumber;
  isScrollTop: number | null;
  isScrollHeight: number | null;
  isClientHeight: number | null;
  isScrolling: boolean;
  isLoadingImages: boolean;
  keyboardKey: number | null;
}

class PhotosPage extends React.Component<IPropsPhotosPage> {
  private link: React.RefObject<HTMLAnchorElement> | null;

  constructor(props: IPropsPhotosPage) {
    super(props);
    this.link = React.createRef();
  }

  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getPopularImages();
    }
  }

  public pressEnterKey = () => {
    if (this.props.searchNamePhoto.trim().length > 0) {
      this.props.getSearchImages(this.props.searchNamePhoto!);
      this.props.getSearchVideos(this.props.searchNamePhoto!);
      this.props.history.push(`/photos/${this.props.searchNamePhoto}`);
      this.props.clearKeyPressNumber();
    }
  };

  public render() {
    return (
      <React.Fragment>
        <HeaderPhotoPage />
        <ModalPhotoPage />
        <div
          className="container-xl photospage_bg"
          style={{
            backgroundImage: `url(${this.props.data?.photos[0].src.original})`,
          }}
        >
          <div className="container-xl">
            <div className="photo_search_input">
              <h1 className="pb-1 text-white">
                The best free stock photos from talented authors.
              </h1>
              <div className="input-group mb-3 input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Find a photo"
                  value={this.props.searchNamePhoto!}
                  onChange={this.props.handleSearchChange}
                  autoFocus={false}
                  required={true}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                      this.pressEnterKey();
                    }
                  }}
                />
                <div className="input-group-append">
                  <NavLink
                    to={`/photos/${this.props.searchNamePhoto}`}
                    className="input-group-text"
                    onClick={() => {
                      this.props.getSearchImages(this.props.searchNamePhoto!);
                      this.props.getSearchVideos(this.props.searchNamePhoto!);
                    }}
                  >
                    <FiSearch />
                  </NavLink>
                </div>
              </div>
              <SuggestedPhotoWords />
            </div>
          </div>
          <p className="photo_by">
            Photo by {this.props.data?.photos[0].photographer}
          </p>
        </div>
        {this.props.isLoadingImages ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
            <NavigationPages />
            <div className="container-xl trending_photos">
              <div className="row mb-2">
                <div className="col-12">
                  <h6 className="mb-4 mt-4">Trending Free Stock Photos</h6>
                </div>
              </div>
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-12">
                  <div className="row">
                    {this.props.data === null
                      ? null
                      : this.props.data.photos.map((image, i) =>
                          i % 2 ? (
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
                                  <MdControlPoint
                                    style={{
                                      color: "white",
                                      fontSize: "1.5rem",
                                    }}
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
                    {this.props.data === null
                      ? null
                      : this.props.data.photos.map((image, i) =>
                          i % 2 === 0 ? (
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
                                  <MdControlPoint
                                    style={{
                                      color: "white",
                                      fontSize: "1.5rem",
                                    }}
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
            <Footer />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  data: state.products.data,
  isScrollTop: state.products.isScrollTop,
  isScrollHeight: state.products.isScrollHeight,
  isClientHeight: state.products.isClientHeight,
  isScrolling: state.products.isScrolling,
  searchNamePhoto: state.products.searchNamePhoto,
  isLoadingImages: state.products.isLoadingImages,
  keyboardKey: state.products.keyboardKey,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    getPopularImages: () => dispatch(getPopularImages()),
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(handleSearchChange(e)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    downloadImage: (elem: any) => dispatch(downloadImage(elem)),
    getIdPhoto: (id: number) => dispatch(getIdPhoto(id)),
    toggleWindowPhotoPage: () => dispatch(toggleWindowPhotoPage()),
    clearKeyPressNumber: () => dispatch(clearKeyPressNumber()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
