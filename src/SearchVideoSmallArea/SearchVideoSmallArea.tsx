import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { IApplicationState } from "../Store/Store";
import {  changeNameVideo, startSearchVideoByName } from "../Actions/ProductsActions";
import "./SearchVideoSmallArea.scss";
import { connect } from "react-redux";
import { IPropsVideosPage } from "../VideosPage/VideosPage";
import { IPopularVideos } from "../ProductsData/ProductsData";

export interface ISearchVideoSmallAreaProps  {
  popularVideo: IPopularVideos | null;
  searchNameVideo: string;
  startSearchVideoByName: typeof startSearchVideoByName;
  watchNameVideoChange: typeof changeNameVideo;
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
              onChange={this.props.watchNameVideoChange}
              autoFocus={false}
            />
            <div className="input-group-append">
              <span
                className="input-group-text"
                onClick={() =>
                  this.props.startSearchVideoByName(this.props.searchNameVideo)
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
  popularVideo: store.products.videos,
  searchNameVideo: store.products.searchNameVideo,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    startSearchVideoByName: (allProps: IPropsVideosPage) =>
      dispatch(startSearchVideoByName(allProps)),
    watchNameVideoChange: (e: string) => dispatch(changeNameVideo(e)),
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(SearchVideosSmallArea)
;
