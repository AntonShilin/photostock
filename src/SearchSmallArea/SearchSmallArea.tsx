import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { IApplicationState } from "../Store/Store";
import { handleSearchChange, getImages } from "../Actions/ProductsActions";
import { IProps } from "../PhotosPage/PhotosPage";
import "./SearchSmallArea.scss";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

export interface ISearchSmallProps extends RouteComponentProps {
  searchNamePhoto: string;
  watchInputChange: typeof handleSearchChange;
  searchImagesByName: typeof getImages;
}

class SearchSmallArea extends React.Component<ISearchSmallProps> {
  public render() {
    return (
      <div className="search-small-area ml-2 input-group input-group-md align-content-center">
        <form className="form-inline w-100 mr-5">
          <div className="input-group w-100">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Find a photo"
              value={this.props.searchNamePhoto}
              onChange={this.props.watchInputChange}
              autoFocus={false}
            />
            <div className="input-group-append">
              <span
                className="input-group-text"
                onClick={() =>
                  this.props.searchImagesByName(this.props.searchNamePhoto)
                }
              >
                <FiSearch />
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => ({
  data: store.products.data,
  searchNamePhoto: store.products.searchNamePhoto,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    watchInputChange: (e: string) => dispatch(handleSearchChange(e)),
    searchImagesByName: (name: string) => dispatch(getImages(name)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchSmallArea)
);
