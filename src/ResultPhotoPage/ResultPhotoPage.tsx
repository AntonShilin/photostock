import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IDataSearch, IPopularVideos } from "../Interfaces/Interfaces";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getSearchImages, handleLikeHeart } from "../Actions/ProductsActions";
import HeaderResultPhotoPage from "./HeaderResultPhotoPage/HeaderResultPhotoPage";
import "./ResultPhotoPage.scss";
import { MdControlPoint } from "react-icons/md";

export interface IDataResult extends RouteComponentProps {
  getSearchImages: typeof getSearchImages;
  resultSearchImage: IDataSearch | null;
  searchNamePhoto: string;
  resultSearchVideo: IPopularVideos | null;
  handleLikeHeart: typeof handleLikeHeart;
}

class ResultPhotoPage extends React.Component<IDataResult> {
  private url = this.props.location.pathname;
  private searchname = this.url.match(/\w+$/);
  private heart: React.RefObject<SVGSVGElement> | null;
  constructor(props: IDataResult) {
    super(props);
    this.heart = React.createRef();
  }

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
                        : this.props.resultSearchImage.photos.length - 1}
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
              <h5 className="text-center mb-5">{`${this.props.location.pathname.match(
                /\w+$/
              )} images`}</h5>
            </div>
          </div>
          <div className="row justify-content-center">
            {this.props.resultSearchImage === null ? (
              <LoadingPage />
            ) : (
              this.props.resultSearchImage.photos.map((image, i) =>
                i % 2 ? (
                  <div key={i} className="col-lg-6 col-md-6 col-sm-12">
                    <div
                      className="info-for-image"
                      style={{
                        backgroundImage: `url(${image.src.large})`,
                      }}
                    >
                      <div className="image-photographer">
                        <p>{image.photographer}</p>
                      </div>
                      <span>
                        <MdControlPoint
                          style={{ color: "white", fontSize: "1.5rem" }}
                        />
                      </span>
                      <span>
                      <svg
                          className="heart"
                          viewBox="0 -2 35 35"
                          xmlns="http://www.w3.org/2000/svg"
                          strokeWidth="0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          width="1.6em"
                          height="1.3em"
                          ref={this.heart}
                          onClick={(e) =>
                            this.props.handleLikeHeart(e)
                          }
                        >
                          <path
                            d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="col-lg-6 col-md-6 col-sm-12">
                    <div
                      className="info-for-image"
                      style={{
                        backgroundImage: `url(${image.src.large})`,
                      }}
                    >
                      <div className="image-photographer">
                        <p>{image.photographer}</p>
                      </div>
                      <span>
                        <MdControlPoint
                          style={{ color: "white", fontSize: "1.5rem" }}
                        />
                      </span>
                      <span>
                      <svg
                          className="heart"
                          viewBox="0 -2 35 35"
                          xmlns="http://www.w3.org/2000/svg"
                          strokeWidth="0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          width="1.6em"
                          height="1.3em"
                          ref={this.heart}
                          onClick={(e) =>
                            this.props.handleLikeHeart(e)
                          }
                        >
                          <path
                            d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                )
              )
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
    handleLikeHeart: (e:React.MouseEvent<SVGSVGElement, MouseEvent>) =>
    dispatch(handleLikeHeart(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPhotoPage);
