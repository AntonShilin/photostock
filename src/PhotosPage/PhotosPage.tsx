import * as React from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import {
  getPopularImages,
  handleSearchKeydown,
  handleLikeHeart,
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

export interface IPropsPhotosPage extends RouteComponentProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
  searchNamePhoto: string;
  watchInputChange: typeof handleSearchChange;
  getSearchImages: typeof getSearchImages;
  getKeyNumber: typeof handleSearchKeydown;
  handleLikeHeart: typeof handleLikeHeart;
  isScrollTop: number | null;
  isScrollHeight: number | null;
  isClientHeight: number | null;
  isScrolling: boolean;
}

class PhotosPage extends React.Component<IPropsPhotosPage> {
  private heart: React.RefObject<SVGSVGElement> | null;

  constructor(props: IPropsPhotosPage) {
    super(props);
    this.heart = React.createRef();
  }

  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getPopularImages();
    }
  }

  public render() {
    return (
      <React.Fragment>
        <HeaderPhotoPage />
        <div
          className="container-fluid photospage_bg"
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
                  value={this.props.searchNamePhoto}
                  onChange={this.props.watchInputChange}
                  autoFocus={false}
                  /* onKeyDown={this.props.getKeyNumber} */
                />
                <div className="input-group-append">
                  <NavLink
                    to={`/photos/${this.props.searchNamePhoto}`}
                    className="input-group-text"
                    onClick={() =>
                      this.props.getSearchImages(this.props.searchNamePhoto)
                    }
                  >
                    <FiSearch />
                  </NavLink>
                </div>
              </div>
              <h6>
                Suggested:
                <span className="text-white pl-2">
                  car, adventure, crowd, dark, workout, butterfly, more...
                </span>
              </h6>
            </div>
          </div>
        </div>
        {this.props.data === null ? (
          <LoadingPage />
        ) : (
          <React.Fragment>
            <NavigationPages />
            <div className="container-xl">
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
                                <img src={image.src.large} alt={`img_${i}`} />
                                <div className="image-photographer">
                                  <p>{image.photographer}</p>
                                </div>
                                <span>
                                  <MdControlPoint
                                    style={{
                                      color: "white",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                                </span>
                                <span>
                                  <svg
                                    className="heart"
                                    viewBox="0 -2 35 35"
                                    xmlns="http://www.w3.org/2000/svg"
                                    strokeWidth="0"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    width="1.6em"
                                    height="1.3em"
                                    ref={this.heart}
                                    onClick={(e) =>
                                      this.props.handleLikeHeart(e)
                                    }
                                  >
                                    <path
                                      d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                                    />
                                  </svg>
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
                                <img src={image.src.large} alt={`img_${i}`} />
                                <div className="image-photographer">
                                  <p>{image.photographer}</p>
                                </div>
                                <span>
                                  <MdControlPoint
                                    style={{
                                      color: "white",
                                      fontSize: "1.5rem",
                                    }}
                                  />
                                </span>
                                <span>
                                  <svg
                                    className="heart"
                                    viewBox="0 -2 35 35"
                                    xmlns="http://www.w3.org/2000/svg"
                                    strokeWidth="0"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    width="1.6em"
                                    height="1.3em"
                                    ref={this.heart}
                                    onClick={(e) =>
                                      this.props.handleLikeHeart(e)
                                    }
                                  >
                                    <path
                                      d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          ) : null
                        )}
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => ({
  data: store.products.data,
  isScrollTop: store.products.isScrollTop,
  isScrollHeight: store.products.isScrollHeight,
  isClientHeight: store.products.isClientHeight,
  isScrolling: store.products.isScrolling,
  searchNamePhoto: store.products.searchNamePhoto,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getKeyNumber: (e: any) => dispatch(handleSearchKeydown(e)),
    getPopularImages: () => dispatch(getPopularImages()),
    watchInputChange: (e: string) => dispatch(handleSearchChange(e)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    handleLikeHeart: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
      dispatch(handleLikeHeart(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
