import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { handleSearchData } from "../Actions/ProductsActions";
import { IDataSearch } from "../ProductsData/ProductsData";
import { RouteComponentProps } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";

export interface IDataResult extends RouteComponentProps {
  getDataSearch: typeof handleSearchData;
  searchResult: IDataSearch | null;
  searchValue: string | "";
}

class ResultPhotoPage extends React.Component<IDataResult> {
  private url = this.props.location.pathname;
  private searchname = this.url.match(/\w+$/);

  public componentDidMount() {
    if (this.searchname !== null) {
      this.props.getDataSearch(this.searchname);
    }
  }

  public render() {
    return (
      <div className="container-xl">
        <div className="row my-3">
          <div className="col-12">
            <h5 className="text-left">
              {this.props.searchValue === ""
                ? `Result`
                : this.props.searchValue + ` photos`}
              <span className="ml-3 badge badge-pill badge-info">
                {this.props.searchResult !== null ? (
                  this.props.searchResult.photos.length > 0 ? (
                    this.props.searchResult.photos.length
                  ) : (
                    "Sorry. Not found. Try again"
                  )
                ) : (
                  <span>0</span>
                )}
              </span>
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center">
              {this.props.searchResult === null ? (
                <LoadingPage />
              ) : (
                this.props.searchResult.photos.map((image, i) => (
                  <div key={i} className="p-2">
                    <img alt="" src={image.src.medium} className="img-fluid" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    searchResult: store.products.searchDataFromInput,
    searchValue: store.products.searchNamePhoto
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDataSearch: (name: string) => dispatch(handleSearchData(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPhotoPage);
