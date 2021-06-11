import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { connect } from "react-redux";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import {
  clearKeyPressNumber,
  getSearchImages,
  getSearchVideos,
  handleSearchChange,
} from "../../Actions/ProductsActions";
import SuggestedPhotoWords from "../../Components/SuggestedPhotoWords/SuggestedPhotoWords";
import { ICuratedPhoto } from "../../Interfaces/Interfaces";
import { IApplicationState } from "../../Store/Store";
import "./MainPhotoPage.scss";

export interface IMainPhotoPageProps extends RouteComponentProps {
  data: ICuratedPhoto | null;
  searchNamePhoto: string;
  getSearchVideos: typeof getSearchVideos;
  getSearchImages: typeof getSearchImages;
  clearKeyPressNumber: typeof clearKeyPressNumber;
  handleSearchChange: typeof handleSearchChange;
}


class MainPhotoPage extends React.Component<
  IMainPhotoPageProps,
    {}
> {
  public pressEnterKey = () => {
    const { searchNamePhoto } = this.props;
    if (searchNamePhoto.trim().length > 0) {
      this.props.getSearchImages(searchNamePhoto!);
      this.props.getSearchVideos(searchNamePhoto!);
      this.props.history.push(`/photos/${searchNamePhoto}`);
      this.props.clearKeyPressNumber();
    }
  };

  public render() {
    const { data, searchNamePhoto } = this.props;

    return (
      <div
        className="container-xl photospage_bg"
        style={{
          backgroundImage: `url(${data?.photos[0].src.original})`,
        }}
      >
        <div className="container-xl">
          <div className="photo_search_input">
            <h1>The best free stock photos from talented authors.</h1>
            <div className="input-group input-group-lg">
              <input
                type="text"
                className="form-control"
                placeholder="Search for free photos"
                value={searchNamePhoto!}
                onChange={this.props.handleSearchChange}
                autoFocus={false}
                required={true}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    this.pressEnterKey();
                  }
                }}
              />
              <div className="input-group-append">
                <NavLink
                  to={`/photos/${searchNamePhoto}`}
                  className="input-group-text"
                  onClick={() => {
                    this.props.getSearchImages(searchNamePhoto!);
                    this.props.getSearchVideos(searchNamePhoto!);
                  }}
                >
                  <FiSearch />
                </NavLink>
              </div>
            </div>
            <SuggestedPhotoWords />
          </div>
        </div>
        <p className="photo_by">Photo by {data?.photos[0].photographer}</p>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  data: state.products.data,
  searchNamePhoto: state.products.searchNamePhoto,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    clearKeyPressNumber: () => dispatch(clearKeyPressNumber()),
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch(handleSearchChange(e)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MainPhotoPage)
);
