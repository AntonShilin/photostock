import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IDataSearch, IPopularVideos } from "../ProductsData/ProductsData";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getSearchImages } from "../Actions/ProductsActions";

export interface IDataResult extends RouteComponentProps {
  getSearchImages: typeof getSearchImages;
  resultSearchImage: IDataSearch | null;
  searchNamePhoto: string;
  resultSearchVideo: IPopularVideos | null;
}

class ResultPhotoPage extends React.Component<IDataResult> {
  private url = this.props.location.pathname;
  private searchname = this.url.match(/\w+$/);

  public componentDidMount() {
    if (this.searchname !== null) {
      this.props.getSearchImages(this.searchname);
    }
  }

  public render() {
    return (
      <div className="container-xl">
        <div className="result-bages row align-items-center mt-3 mb-3">
          <div className="col-3 text-right">
            <NavLink
              to={`${this.url}`}
              className="p-2 text-decoration-none btn btn-light"
            >
              Photos
              <span className="ml-1">
                {this.props.resultSearchImage === null
                  ? "0"
                  : this.props.resultSearchImage.photos.length}
              </span>
            </NavLink>
          </div>
          <div className="col-3 text-left">
            <NavLink
              to={`/videos/${this.searchname}`}
              className="p-2 text-decoration-none btn btn-light"
            >
              Videos
              <span className="ml-1">
                {this.props.resultSearchVideo === null
                  ? "0"
                  : this.props.resultSearchVideo.videos.length - 1}
              </span>
            </NavLink>
          </div>
          <div className="col-6 text-center" />
        </div>
        <div className="row mt-3 mb-3">
          <div className="col-12">
            <h5 className="text-center">{`${this.searchname} photos`}</h5>
          </div>
        </div>
        <div className="row justify-content-center">
          {this.props.resultSearchImage === null ? (
            <LoadingPage />
          ) : (
            this.props.resultSearchImage.photos.map((image, i) => (
              <div key={i} className="col-auto">
                <div className="p-1">
                  <img alt="img" src={image.src.medium} className="img-fluid" />
                </div>
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
    resultSearchImage: store.products.resultSearchImage,
    searchNamePhoto: store.products.searchNamePhoto,
    resultSearchVideo: store.products.resultSearchVideo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPhotoPage);
