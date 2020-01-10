import * as React from "react";
import { connect } from "react-redux";
import { searchVideos, IPopularVideos } from "./ProductsData";
import { getPopularVideo } from "./ProductsActions";
import { IApplicationState } from "./Store";

export interface IPropsVideosPage {
  getVideo: typeof getPopularVideo;
  videoData: IPopularVideos | null;
}

class VideosPage extends React.Component<IPropsVideosPage> {
  public componentDidMount() {
    this.props.getVideo();
  }

  public render() {
    console.log("VideoPage", this.props);
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid" /* style={bgimage} */>
          <div className="container">
            <h1 className="pb-5">
              The best free stock videos from talented authors.
            </h1>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Find video"
            
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success"
                  type="submit"
            
                >
                  Search
                </button>
              </div>
            </div>
            <small>
              Search ideas: businessman, hd wallpapers, abstract, phone, green,
              more...
            </small>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6 col-md-12">
              <h6>New free stock videos</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap align-content-around">
                {this.props.videoData === null ? (
                  <p>{"Loading ..."}</p>
                ) : (
                  this.props.videoData.videos.map((value, i) => (
                    <div key={i} className="media m-2">
                      <video width="320" height="240" controls={true}>
                        <source
                          src={value.video_files[2].link}
                          type={value.video_files[2].file_type}
                        />
                      </video>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    videoData: store.products.videos
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getVideo: () => dispatch(getPopularVideo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage);
