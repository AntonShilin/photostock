import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IPopularVideos, IDataSearch } from "../ProductsData/ProductsData";
import { getSearchVideos } from "../Actions/ProductsActions";
import { RouteComponentProps, NavLink } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";

export interface IPropsResultPage extends RouteComponentProps {
  resultSearchVideo: IPopularVideos | null;
  getSearchVideos: typeof getSearchVideos;
  nameVideo: "" | string;
  resultSearchImage: IDataSearch | null;
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
    return (
      <div className="container-xl">
        <div className="result-bages row align-items-center mt-3 mb-3">
          <div className="col-3 text-right">
            <NavLink
              to={`/photos/${this.searchname}`}
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
              to={`${this.url}`}
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
        <div className="row">
          <div className="col-12">
              {this.props.resultSearchVideo === null ? (
                <LoadingPage />
              ) : (
                this.props.resultSearchVideo.videos.map((num, i) => (
                  <div key={i} className="d-inline m-1">
                    <video
                      width="420"
                      height="340"
                      controls={true}
                      className="img-fluid"
                    >
                      <source
                        src={num.video_files[2].link}
                        type={num.video_files[2].file_type}
                      />
                    </video>
                  </div>
                ))
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    resultSearchVideo: store.products.resultSearchVideo,
    nameVideo: store.products.searchNameVideo,
    resultSearchImage: store.products.resultSearchImage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultVideoPage);
