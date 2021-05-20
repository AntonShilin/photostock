import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { IApplicationState } from "../../Store/Store";
import {
  handleSearchChange,
  getSearchImages,
  getSearchVideos,
  clearKeyPressNumber,
} from "../../Actions/ProductsActions";
import "./SearchFotoSmallArea.scss";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

export interface ISearchFotoSmallAreaProps extends RouteComponentProps {
  searchNamePhoto: string | null;
  searchNameVideo: string | null;
  watchInputChange: typeof handleSearchChange;
  getSearchImages: typeof getSearchImages;
  getSearchVideos: typeof getSearchVideos;
  clearKeyPressNumber: typeof clearKeyPressNumber;
}

class SearchFotoSmallArea extends React.Component<ISearchFotoSmallAreaProps> {
  public pressEnterKey = () => {
    if (this.props.searchNamePhoto!.trim().length > 0) {
      this.props.getSearchImages(this.props.searchNamePhoto!);
      this.props.getSearchVideos(this.props.searchNamePhoto!);
      this.props.history.push(`/photos/${this.props.searchNamePhoto}`);
      this.props.clearKeyPressNumber();
    }
  };

  public render() {
    return (
      <div className="photo_search-small-area ">
        <form>
          <input
            type="text"
            placeholder="Find a photo"
            value={this.props.searchNamePhoto!}
            onChange={(e) => this.props.watchInputChange(e)}
            autoFocus={false}
            required={true}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                this.pressEnterKey();
                e.preventDefault();
              }
            }}
          />
          <NavLink
            to={`/photos/${this.props.searchNamePhoto}`}
            onClick={() => {
              this.props.getSearchImages(this.props.searchNamePhoto!);
              this.props.getSearchVideos(this.props.searchNameVideo!);
            }}
          >
            <FiSearch style={{ color: "black" }} />
          </NavLink>
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
    watchInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(handleSearchChange(e)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    clearKeyPressNumber: () => dispatch(clearKeyPressNumber()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchFotoSmallArea)
);
