import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { IApplicationState } from "../../Store/Store";
import {  changeNameVideo, getSearchVideos, getSearchImages} from "../../Actions/ProductsActions";
import "./SearchVideoSmallArea.scss";
import { connect } from "react-redux";
import { IPopularVideos } from "../../Interfaces/Interfaces";
import { NavLink } from "react-router-dom";

export interface ISearchVideoSmallAreaProps  {
  popularVideo: IPopularVideos | null;
  searchNameVideo: string |null;
  searchNamePhoto: string |null;
  getSearchVideos: typeof getSearchVideos;
  changeNameVideo: typeof changeNameVideo;
  getSearchImages: typeof getSearchImages;
}

class SearchVideosSmallArea extends React.Component<ISearchVideoSmallAreaProps> {
  public render() {
    return (
      <div className="video_search-small-area ml-2 input-group input-group-md align-content-center">
        <form className="form-inline w-100">
          <div className="input-group w-100">
            <input
              required={true}
              type="text"
              className="form-control"
              placeholder="Find a photo"
              value={this.props.searchNameVideo!}
              onChange={(e)=>this.props.changeNameVideo(e)}
              autoFocus={false}
            />
            <div className="input-group-append">
              <NavLink to={`/videos/${this.props.searchNameVideo}`}
                className="input-group-text"
                onClick={() => {
                  this.props.getSearchVideos(this.props.searchNameVideo!);
                  this.props.getSearchImages(this.props.searchNamePhoto!);
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
  popularVideo: state.products.videos,
  searchNameVideo: state.products.searchNameVideo,
  searchNamePhoto: state.products.searchNamePhoto,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name:string) =>
      dispatch(getSearchVideos(name)),
    changeNameVideo: (e: React.ChangeEvent<HTMLInputElement>) => dispatch(changeNameVideo(e)),
     getSearchImages: (name: string) => dispatch(getSearchImages(name)),
  };
};

export default  connect(mapStateToProps, mapDispatchToProps)(SearchVideosSmallArea)
;
