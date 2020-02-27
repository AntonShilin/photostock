import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import "url-search-params-polyfill";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { getData, handleSearchKeydown } from "../Actions/ProductsActions";
import { handleSearchChange } from "../Actions/ProductsActions";
import { handleSearchPictureName } from "../Actions/ProductsActions";
import { ICuratedPhoto } from "../ProductsData/ProductsData";
import "./PhotosPage.scss";
import LoadingPage from "../LoadingPage/LoadingPage";
import { FiSearch } from "react-icons/fi";

export interface IProps extends RouteComponentProps {
  data: ICuratedPhoto | null;
  getDataForMainPage: typeof getData;
  searchNamePhoto: "";
  watchInputChange: typeof handleSearchChange;
  getNamePictureSearch: typeof handleSearchPictureName;
  getKeyNumber: typeof handleSearchKeydown;
}

class PhotosPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getDataForMainPage();
    }
  }

  public render() {
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid bg-light photospage_bg">
          <div className="container">
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
                  onClick={() => this.props.getNamePictureSearch(this.props)}
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
        </div>
        <div className="container-xl bg-light">
          <div className="row mb-2">
            <div className="col-12">
              <h6 className="m-0 mt-2">Free Stock Photos Trending </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center">
                {this.props.data === null ? (
                  <LoadingPage />
                ) : (
                  this.props.data.photos.map((image, i) => (
                    <div key={i} className="p-2">
                      <img
                        src={image.src.medium}
                        className="img-fluid"
                        alt="img_1"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => ({
  data: store.products.data
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getKeyNumber: (e: any) => dispatch(handleSearchKeydown(e)),
    getDataForMainPage: () => dispatch(getData()),
    watchInputChange: (e: string) => dispatch(handleSearchChange(e)),
    getNamePictureSearch: (allprops: IProps) =>
      dispatch(handleSearchPictureName(allprops))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
