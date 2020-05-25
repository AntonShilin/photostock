import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IPopularVideos, IDataSearch } from "../Interfaces/Interfaces";
import { getSearchVideos } from "../Actions/ProductsActions";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import HeaderResultVideoPage from "./HeaderResultVideoPage/HeaderResultVideoPage";
import "./ResultVideoPage.scss";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { MdControlPoint } from "react-icons/md";
import { FiHeart } from "react-icons/fi";

export interface IPropsResultPage extends RouteComponentProps {
  resultSearchVideo: IPopularVideos | null;
  getSearchVideos: typeof getSearchVideos;
  resultSearchImage: IDataSearch | null;
  searchNameVideo: string;
}

class ResultVideoPage extends React.Component<IPropsResultPage> {
  private url = this.props.location.pathname;
  private searchname = this.url.match(/\w+$/);

  public componentDidMount() {
    if (this.searchname !== null) {
      this.props.getSearchVideos(this.searchname[0]);
    }
  }

  public render() {
    console.log(this.searchname!)
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
                        // poster={num.image}
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
                        <FiHeart
                          style={{ color: "white", fontSize: "1.5rem" }}
                        />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultVideoPage);
