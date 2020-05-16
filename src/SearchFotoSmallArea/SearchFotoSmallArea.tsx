import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { IApplicationState } from "../Store/Store";
import { handleSearchChange, getSearchImages } from "../Actions/ProductsActions";
import "./SearchFotoSmallArea.scss";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

export interface ISearchFotoSmallAreaProps  {
  searchNamePhoto: string;
  watchInputChange: typeof handleSearchChange;
  getSearchImages: typeof getSearchImages;
}

class SearchFotoSmallArea extends React.Component<ISearchFotoSmallAreaProps> {
  public render() {
    return (
      <div className="photo_search-small-area ml-2 input-group input-group-md align-content-center">
        <form className="form-inline w-100">
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
              <NavLink to={`/photos/${this.props.searchNamePhoto}`}
                className="input-group-text"
                onClick={() =>
                  this.props.getSearchImages(this.props.searchNamePhoto)
                }
              >
                <FiSearch />
              </NavLink>
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
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(SearchFotoSmallArea)
;
