import * as React from "react";
import { Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import "url-search-params-polyfill";
import { connect } from "react-redux";
import { IApplicationState } from "./Store";
import { getData } from "./ProductsActions";
import { handleSearchKeydown } from "./ProductsActions";
import { handleSearchChange } from "./ProductsActions";
import { handleSearchName } from "./ProductsActions";
import { ICuratedPhoto } from "./ProductsData";

export interface IProps extends RouteComponentProps {
  data: ICuratedPhoto | null;
  getDataForMainPage: typeof getData;
  search: "";
  watchInputChange: typeof handleSearchChange;
  getKeyNumber: typeof handleSearchKeydown;
  goByTheNameOfTheSearch: typeof handleSearchName;
}

class PhotosPage extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.getDataForMainPage();
  }

  public render() {
    const bgimage = {
      backgroundImage:
        "url(" +
        `${
          this.props.data !== null
            ? this.props.data.photos[0].src.landscape
            : ""
        }` +
        ")"
    };

    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid" style={bgimage}>
          <div className="container">
            <h1 className="pb-5">
              The best free stock photos from talented authors.
            </h1>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Find a photo"
                value={this.props.search}
                onChange={this.props.watchInputChange}
                onKeyDown={this.props.getKeyNumber}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={() => this.props.goByTheNameOfTheSearch(this.props)}
                >
                  Search
                </button>
              </div>
            </div>
            <small>
              Search ideas: car, adventure, crowd, dark, workout, butterfly,
              more...
            </small>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6 col-md-6">
              <h6 className="m-0">New free stock photos</h6>
            </div>
            <div className="col-sm-6 col-md-6 text-right">
              <button className="btn btn-secondary">Next page</button>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap align-content-around">
                {this.props.data === null ? (
                  <p>{"Loading ..."}</p>
                ) : (
                  this.props.data.photos.map((image, i) => (
                    <div key={i} className="p-2">
                      <img src={image.src.medium} className="img-fluid" />
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

const mapStateToProps = (store: IApplicationState, url: URLSearchParams) => {
  return {
    data: store.products.data
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDataForMainPage: () => dispatch(getData()),
    watchInputChange: (e: string) => dispatch(handleSearchChange(e)),
    getKeyNumber: (e: any) => dispatch(handleSearchKeydown(e)),
    goByTheNameOfTheSearch: (allprops: IProps) =>
      dispatch(handleSearchName(allprops))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
