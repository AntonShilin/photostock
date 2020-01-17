import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "./Store";
import { IPopularVideos } from "./ProductsData";
import { getVideo } from "./ProductsActions";

export interface IPropsResultPage {
  result: IPopularVideos | null;
  getSearchVideo: typeof getVideo;
  nameVideo: "" | string;
}

class ResultVideoPage extends React.Component<IPropsResultPage> {
  public componentDidMount() {
    this.props.getSearchVideo(this.props.nameVideo);
  }

  public render() {
    return (
      <div className="container-fluid">
        <div className="row my-3">
          <div className="col-12">
            <h3 className="text-left m-0 mt-2">
              {`${this.props.nameVideo} videos`}
              <span className="ml-3 badge badge-pill badge-info">
                {this.props.result !== null ? (
                  this.props.result.videos.length
                ) : (
                  <span>0</span>
                )}
              </span>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap align-content-around">
              {this.props.result === null ? (
                <p>{"Loading ..."}</p>
              ) : (
                this.props.result.videos.map((num, i) => (
                  <div key={i} className="media m-2">
                    <video width="320" height="240" controls={true}>
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
