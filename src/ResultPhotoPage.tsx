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
    console.log("ProductPage", this.props);
  }

  public render() {
    return (
      <div className="page-container">
        <div className="d-flex flex-wrap align-content-around">
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
