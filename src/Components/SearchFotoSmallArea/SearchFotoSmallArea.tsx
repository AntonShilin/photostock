import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { IApplicationState } from "../../Store/Store";
import { handleSearchChange, getSearchImages, getSearchVideos } from "../../Actions/ProductsActions";
import "./SearchFotoSmallArea.scss";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

export interface ISearchFotoSmallAreaProps  {
  searchNamePhoto: string;
  searchNameVideo: string;
  watchInputChange: typeof handleSearchChange;
  getSearchImages: typeof getSearchImages;
  getSearchVideos: typeof getSearchVideos;
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
              required={true}
            />
            <div className="input-group-append">
              <NavLink to={`/photos/${this.props.searchNamePhoto}`}
                className="input-group-text"
                onClick={() => {
                  this.props.getSearchImages(this.props.searchNamePhoto);
                  this.props.getSearchVideos(this.props.searchNameVideo);
                }}
              >
                <FiSearch style={{color:"black"}}/>
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  data: state.products.data,
  searchNamePhoto: state.products.searchNamePhoto,
  searchNameVideo: state.products.searchNameVideo,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    watchInputChange: (e: string) => dispatch(handleSearchChange(e)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(SearchFotoSmallArea)
;
