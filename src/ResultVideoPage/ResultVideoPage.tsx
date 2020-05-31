import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IPopularVideos, IDataSearch } from "../Interfaces/Interfaces";
import { getSearchVideos, handleLikeHeart } from "../Actions/ProductsActions";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import HeaderResultVideoPage from "./HeaderResultVideoPage/HeaderResultVideoPage";
import "./ResultVideoPage.scss";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { MdControlPoint } from "react-icons/md";

export interface IPropsResultPage extends RouteComponentProps {
  resultSearchVideo: IPopularVideos | null;
  getSearchVideos: typeof getSearchVideos;
  resultSearchImage: IDataSearch | null;
  searchNameVideo: string;
  handleLikeHeart: typeof handleLikeHeart;
}

class ResultVideoPage extends React.Component<IPropsResultPage> {
  private url = this.props.location.pathname;
  private searchname = this.url.match(/\w+$/);
  private heart: React.RefObject<SVGSVGElement> | null;

  constructor(props: IPropsResultPage) {
    super(props);
    this.heart = React.createRef();
  }

  public componentDidMount() {
    if (this.searchname !== null) {
      this.props.getSearchVideos(this.searchname[0]);
    }
  }

  public render() {
    return (
      <React.Fragment>
        <HeaderResultVideoPage />
        <div className="container-xl">
          <div className="video-result-bages row align-items-center justify-content-md-center mt-3 mb-5">
            <div className="col-auto">
              <ul className="list-group list-group-horizontal">
                <li className="list-group-item">
                  {" "}
                  <NavLink
                    activeClassName="video-result-bages-active"
                    to={`/photos/${this.searchname}`}
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
                    activeClassName="video-result-bages-active"
                    to={`${this.url}`}
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
              } videos`}</h5>
            </div>
          </div>
          <div className="row justify-content-center">
            {this.props.resultSearchVideo === null ? (
              <LoadingPage />
            ) : (
              this.props.resultSearchVideo.videos.map((num, i) =>
                i < 10 ? (
                  <div key={i} className="col-lg-6 col-md-6 col-sm-12">
                    <div className="m-1 result_video_item">
                      <video
                        controls={false}
                      >
                        <source
                          src={num.video_files[0].link}
                          type={num.video_files[0].file_type}
                        />
                        Your browser doesn't support HTML5 video tag.
                      </video>
                      <div className="video_item_control">
                        <AiOutlinePlayCircle
                          style={{ fontSize: "3.5rem", color: "white" }}
                        />
                      </div>
                      <div className="video-person-name">
                        <p>{num.user.name}</p>
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
                ) : null
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
    resultSearchVideo: store.products.resultSearchVideo,
    searchNameVideo: store.products.searchNameVideo,
    resultSearchImage: store.products.resultSearchImage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    handleLikeHeart: (e:React.MouseEvent<SVGSVGElement, MouseEvent>) =>
      dispatch(handleLikeHeart(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultVideoPage);
