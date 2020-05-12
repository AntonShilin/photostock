import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import "url-search-params-polyfill";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import {
  getPopularImages,
  handleSearchKeydown,
} from "../Actions/ProductsActions";
import { handleSearchChange } from "../Actions/ProductsActions";
import { startSearchPictureByName } from "../Actions/ProductsActions";
import { ICuratedPhoto } from "../ProductsData/ProductsData";
import "./PhotosPage.scss";
import LoadingPage from "../LoadingPage/LoadingPage";
import { FiSearch } from "react-icons/fi";
import NavigationPages from "../NavigationPages/NavigationPages";

export interface IPropsPhotosPage extends RouteComponentProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
  searchNamePhoto: string;
  watchInputChange: typeof handleSearchChange;
  startSearchPictureByName: typeof startSearchPictureByName;
  getKeyNumber: typeof handleSearchKeydown;
  isScrollTop: number | null;
  isScrollHeight: number | null;
  isClientHeight: number | null;
  isScrolling: boolean;
}

class PhotosPage extends React.Component<IPropsPhotosPage> {
  constructor(props: IPropsPhotosPage) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getPopularImages();
    }
  }

  public render() {
    return (
      <React.Fragment>
        <div className="container-xl bg-light photospage_bg">
          <h1 className="pb-5 text-white">
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
              <span
                className="input-group-text"
                onClick={() => this.props.startSearchPictureByName(this.props)}
              >
                <FiSearch />
              </span>
            </div>
          </div>
          <h6>
            Search ideas:{" "}
            <span className="text-white">
              car, adventure, crowd, dark, workout, butterfly, more...
            </span>
          </h6>
        </div>
        <NavigationPages />
        <div className="container-xl bg-light">
          <div className="row mb-2">
            <div className="col-12">
              <h6 className="m-0 mt-2">Free Stock Photos Trending </h6>
            </div>
          </div>
          <div className="row justify-content-center">
            {this.props.data === null ? (
              <LoadingPage />
            ) : (
              this.props.data.photos.map((elem, i) => (
                <div key={i} className="col-auto">
                  <div className="p-1">
                    <div className="info-for-image">
                      <img
                        src={elem.src.medium}
                        className="img-fluid"
                        alt="img_1"
                      />
                    </div>
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
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getKeyNumber: (e: any) => dispatch(handleSearchKeydown(e)),
    getPopularImages: () => dispatch(getPopularImages()),
    watchInputChange: (e: string) => dispatch(handleSearchChange(e)),
    startSearchPictureByName: (allprops: IPropsPhotosPage) =>
      dispatch(startSearchPictureByName(allprops)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
