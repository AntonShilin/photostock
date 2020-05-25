import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IDataSearch, IPopularVideos } from "../Interfaces/Interfaces";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getSearchImages } from "../Actions/ProductsActions";
import HeaderResultPhotoPage from "./HeaderResultPhotoPage/HeaderResultPhotoPage";
import "./ResultPhotoPage.scss";
import { MdControlPoint } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

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
      this.props.getSearchImages(this.searchname[0]);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <HeaderResultPhotoPage />
        <div className="container-xl">
          <div className="photo-result-bages row align-items-center justify-content-md-center mt-3 mb-5">
            <div className="col-auto">
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item">
                  {" "}
                  <NavLink
                    activeClassName="photo-result-bages-active"
                    to={`${this.url}`}
                  >
                    Photos
                    <span className="ml-1">
                      {this.props.resultSearchImage === null
                        ? 0
                        : this.props.resultSearchImage.photos.length-1}
                    </span>
                  </NavLink>
                </li>
                <li className="list-group-item">
                  {" "}
                  <NavLink
                    activeClassName="photo-result-bages-active"
                    to={`/videos/${this.searchname}`}
                  >
                    Videos
                    <span className="ml-1">
                      {this.props.resultSearchVideo === null
                        ? 0
                        : this.props.resultSearchVideo.videos.length - 1}
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-3 mb-3">
            <div className="col-12">
              <h5 className="text-center mb-5">{`${
                this.props.location.pathname.match(/\w+$/)
              } images`}</h5>
            </div>
          </div>
          <div className="row justify-content-center">
            {this.props.resultSearchImage === null ? (
              <LoadingPage />
            ) : (
              this.props.resultSearchImage.photos.map((image, i) => (
                <div key={i} className="col-auto">
                  <div className="info-for-image">
                    <img
                      alt="img"
                      src={image.src.medium}
                      className="img-fluid"
                    />
                    <div className="image-photographer">
                      <p>{image.photographer}</p>
                    </div>
                    <span>
                      <MdControlPoint style={{ color: "white", fontSize:"1.5rem"}}/>
                    </span>
                    <span>
                      <FiHeart style={{ color: "white",fontSize:"1.5rem"}}/>
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </React.Fragment>
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
