import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { IApplicationState } from "./Store";
import { handleSearchData } from "./ProductsActions";
import { IDataSearch } from "./ProductsData";

export interface IDataResult extends RouteComponentProps {
  getDataSearch: typeof handleSearchData;
  searchResult: IDataSearch | null;
  searchValue: string | "";
}

class ResultPhotoPage extends React.Component<IDataResult> {
  constructor(props: IDataResult) {
    super(props);
  }

  public componentDidMount() {
    this.props.getDataSearch(this.props.searchValue);
  }

  public render() {
    console.log("ResultPhotoPage", this.props);
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-12">
            <h3 className="text-left">
              {`${this.props.searchValue} photos`}
              <span className="ml-3 badge badge-pill badge-info">
                {this.props.searchResult !== null ? (
                  this.props.searchResult.photos.length
                ) : (
                  <span>0</span>
                )}
              </span>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-around">
              {this.props.searchResult === null ? (
                <p>{"Loading ..."}</p>
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
    searchValue: store.products.search
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDataSearch: (name: string) => dispatch(handleSearchData(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPhotoPage);
