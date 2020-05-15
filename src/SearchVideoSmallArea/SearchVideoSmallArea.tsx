import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { IApplicationState } from "../Store/Store";
import {  changeNameVideo, getSearchVideos} from "../Actions/ProductsActions";
import "./SearchVideoSmallArea.scss";
import { connect } from "react-redux";
import { IPopularVideos } from "../Interfaces/Interfaces";
import { NavLink } from "react-router-dom";

export interface ISearchVideoSmallAreaProps  {
  popularVideo: IPopularVideos | null;
  searchNameVideo: string;
  getSearchVideos: typeof getSearchVideos;
  changeNameVideo: typeof changeNameVideo;
}

class SearchVideosSmallArea extends React.Component<ISearchVideoSmallAreaProps> {
  public render() {
    return (
      <div className="search-small-area ml-2 input-group input-group-md align-content-center">
        <form className="form-inline w-100 mr-5">
          <div className="input-group w-100">
            <input
              type="text"
              className="form-control w-100"
              placeholder="Find a photo"
              value={this.props.searchNameVideo}
              onChange={this.props.changeNameVideo}
              autoFocus={false}
            />
            <div className="input-group-append">
              <NavLink to={`/videos/${this.props.searchNameVideo}`}
                className="input-group-text"
                onClick={() =>
                  this.props.getSearchVideos(this.props.searchNameVideo)
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
  popularVideo: store.products.videos,
  searchNameVideo: store.products.searchNameVideo,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name:string) =>
      dispatch(getSearchVideos(name)),
    changeNameVideo: (e: string) =>  dispatch(changeNameVideo(e)),
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(SearchVideosSmallArea)
;
