import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import { IPopularVideos } from "../ProductsData/ProductsData";
import { getVideo } from "../Actions/ProductsActions";
import { RouteComponentProps } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";

export interface IPropsResultPage extends RouteComponentProps {
  result: IPopularVideos | null;
  getSearchVideo: typeof getVideo;
  nameVideo: "" | string;
}

class ResultVideoPage extends React.Component<IPropsResultPage> {
  private url = this.props.location.pathname;
  private searchname = this.url.match(/\w+$/);

  public componentDidMount() {
    if (this.searchname !== null) {
      this.props.getSearchVideo(this.searchname[0]);
    }
  }

  public render() {
    return (
      <div className="container-xl">
        <div className="row my-3">
          <div className="col-12">
            <h5 className="text-left m-0 mt-2 ">
              {this.props.nameVideo === ""
                ? `Result`
                : this.props.nameVideo + ` videos`}
              <span className="ml-3 badge badge-pill badge-info">
                {this.props.result !== null ? (
                  this.props.result.videos.length > 0 ? (
                    this.props.result.videos.length
                  ) : (
                    "Not found video. Try again"
                  )
                ) : <span>0</span>}
              </span>
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-around">
              {this.props.result === null ? (
                <LoadingPage />
              ) : (
                this.props.result.videos.map((num, i) => (
                  <div key={i} className="media m-2">
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
      </div>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    result: store.products.resultSearchVideo,
    nameVideo: store.products.searchNameVideo
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideo: (name: string) => dispatch(getVideo(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultVideoPage);