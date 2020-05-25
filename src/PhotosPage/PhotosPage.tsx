import * as React from "react";
import { RouteComponentProps, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import {
  getPopularImages,
  handleSearchKeydown,
} from "../Actions/ProductsActions";
import { handleSearchChange } from "../Actions/ProductsActions";
import { getSearchImages } from "../Actions/ProductsActions";
import { ICuratedPhoto } from "../Interfaces/Interfaces";
import "./PhotosPage.scss";
import LoadingPage from "../LoadingPage/LoadingPage";
import { FiSearch } from "react-icons/fi";
import NavigationPages from "../NavigationPages/NavigationPages";
import HeaderPhotoPage from "./HeaderPhotoPage/HeaderPhotoPage";
import { MdControlPoint } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

export interface IPropsPhotosPage extends RouteComponentProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
  searchNamePhoto: string;
  watchInputChange: typeof handleSearchChange;
  getSearchImages: typeof getSearchImages;
  getKeyNumber: typeof handleSearchKeydown;
  isScrollTop: number | null;
  isScrollHeight: number | null;
  isClientHeight: number | null;
  isScrolling: boolean;
}

class PhotosPage extends React.Component<IPropsPhotosPage> {
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
          className="container-xl photospage_bg"
          style={{
            backgroundImage: `url(${this.props.data?.photos[0].src.landscape})`,
          }}
        >
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
        <NavigationPages />
        <div className="container-xl">
          <div className="row mb-2">
            <div className="col-12">
              <h6 className="mb-4 mt-4">Trending Free Stock Photos</h6>
            </div>
          </div>
          <div className="row justify-content-center">
            {this.props.data === null ? (
              <LoadingPage />
            ) : (
              this.props.data.photos.map((elem, i) => (
                <div key={i} className="col-auto">
                  <div className="info-for-image">
                    <img
                      src={elem.src.medium}
                      className="img-fluid"
                      alt="img_1"
                    />
                    <div className="image-photographer">
                      <p>{elem.photographer}</p>
                    </div>
                    <span>
                      <MdControlPoint style={{ color: "white", fontSize:"1.5rem"}}/>
                    </span>
                    <span>
                      <FiHeart style={{ color: "white",fontSize:"1.5rem"}}/>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
