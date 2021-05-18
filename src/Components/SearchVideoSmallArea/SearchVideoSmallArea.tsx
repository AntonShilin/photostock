import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { IApplicationState } from "../../Store/Store";
import {
  changeNameVideo,
  getSearchVideos,
  getSearchImages,
  clearKeyPressNumber,
} from "../../Actions/ProductsActions";
import "./SearchVideoSmallArea.scss";
import { connect } from "react-redux";
import { IPopularVideos } from "../../Interfaces/Interfaces";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";

export interface ISearchVideoSmallAreaProps extends RouteComponentProps {
  popularVideo: IPopularVideos | null;
  searchNameVideo: string | null;
  searchNamePhoto: string | null;
  getSearchVideos: typeof getSearchVideos;
  changeNameVideo: typeof changeNameVideo;
  getSearchImages: typeof getSearchImages;
  clearKeyPressNumber: typeof clearKeyPressNumber;
}

class SearchVideosSmallArea extends React.Component<ISearchVideoSmallAreaProps> {
  public pressEnterKey = () => {
    if (this.props.searchNameVideo!.trim().length > 0) {
      this.props.getSearchImages(this.props.searchNameVideo!);
      this.props.getSearchVideos(this.props.searchNameVideo!);
      this.props.history.push(`/videos/${this.props.searchNameVideo}`);
      this.props.clearKeyPressNumber();
    }
  };

  public render() {
    return (
      <div className="video_search-small-area">
        <form>
          <div>
            <input
              required={true}
              type="text"
              placeholder="Find a video"
              value={this.props.searchNameVideo!}
              onChange={(e) => this.props.changeNameVideo(e)}
              autoFocus={false}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  this.pressEnterKey();
                  e.preventDefault();
                }
              }}
            />
              <NavLink
                to={`/videos/${this.props.searchNameVideo}`}
                onClick={() => {
                  this.props.getSearchVideos(this.props.searchNameVideo!);
                  this.props.getSearchImages(this.props.searchNamePhoto!);
                }}
              >
                <FiSearch/>
              </NavLink>
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
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    changeNameVideo: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(changeNameVideo(e)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    clearKeyPressNumber: () => dispatch(clearKeyPressNumber()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchVideosSmallArea)
);
