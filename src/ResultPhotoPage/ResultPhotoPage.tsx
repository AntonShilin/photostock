import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IDataSearch, IPopularVideos } from "../ProductsData/ProductsData";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getImages } from "../Actions/ProductsActions";

export interface IDataResult extends RouteComponentProps {
  getResultSearchImageByName: typeof getImages;
  searchResultByPhoto: IDataSearch | null;
  searchNamePhoto: string;
  searchResultByVideo: IPopularVideos | null;
  
}

class ResultPhotoPage extends React.Component<IDataResult> {
  private url = this.props.location.pathname;
  private searchname = this.url.match(/\w+$/);

  public componentDidMount() {
    if (this.props.searchNamePhoto !== "") {
      this.props.getResultSearchImageByName(this.props.searchNamePhoto);
    } else if (this.props.searchNamePhoto === "") {
      this.props.getResultSearchImageByName(this.searchname);
    }
  }

  public render() {
    return (
      <div className="container-xl">
        <div className="result-bages row align-items-center mt-3 mb-3">
          <div className="col-3 text-right">
            <NavLink to={`${this.url}`} className="p-2 text-decoration-none btn btn-light">
              Photos
              <span className="ml-1">
                {this.props.searchResultByPhoto === null
                  ? '0'
                  : this.props.searchResultByPhoto.photos.length}
              </span>
            </NavLink>
          </div>
          <div className="col-3 text-left">
            <NavLink to="/videos" className="p-2 text-decoration-none btn btn-light">
              Videos
              <span className="ml-1">
                {this.props.searchResultByVideo === null
                  ? '0'
                  : this.props.searchResultByVideo.videos.length}
              </span>
            </NavLink>
          </div>
          <div className="col-6 text-center" />
        </div>
        <div className="row my-3">
          <div className="col-12">
            <h5 className="text-center">{`${this.searchname} photos`}</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-center">
              {this.props.searchResultByPhoto === null ? (
                <LoadingPage />
              ) : (
                this.props.searchResultByPhoto.photos.map((image, i) => (
                  <div key={i} className="p-2">
                    <img
                      alt="img"
                      src={image.src.medium}
                      className="img-fluid"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    searchResultByPhoto: store.products.searchDataFromInput,
    searchNamePhoto: store.products.searchNamePhoto,
    searchResultByVideo: store.products.resultSearchVideo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getResultSearchImageByName: (name: string) => dispatch(getImages(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPhotoPage);
