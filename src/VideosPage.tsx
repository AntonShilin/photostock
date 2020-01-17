import * as React from "react";
import { connect } from "react-redux";
import { searchVideos, IPopularVideos } from "./ProductsData";
import { getPopularVideo, showResultSearchVideo,changeNameVideo } from "./ProductsActions";
import { IApplicationState } from "./Store";

export interface IPropsVideosPage {
  getPopularVideo: typeof getPopularVideo;
  popularVideo: IPopularVideos | null;
  searchName: "";
  getResultSearch: typeof showResultSearchVideo;
  watchNameVideoChange: typeof changeNameVideo;
}

class VideosPage extends React.Component<IPropsVideosPage> {
  public componentDidMount() {
    this.props.getPopularVideo();
  }

  public render() {
    const bgimage = {
      backgroundSize: "100%",
      backgroundRepeat: "no-repeat",
      backgroundImage:
        "url(" +
        `${
          this.props.popularVideo !== null
            ? this.props.popularVideo.videos[3].video_pictures[3].picture
            : ""
        }` +
        ")"
    };
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid" style={bgimage}>
          <div className="container">
            <h1 className="pb-5">
              The best free stock videos from talented authors.
            </h1>
            <div className="input-group mb-3 input-group-lg">
              <input
                type="text"
                className="form-control"
                placeholder="Find video"
                value={this.props.searchName}
                 onChange={this.props.watchNameVideoChange}
                // onKeyDown={this.props.getKeyNumber}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success"
                  type="submit"
                  onClick={() => this.props.getResultSearch(this.props)}
                >
                  Search
                </button>
              </div>
            </div>
            <h6>
              Search ideas: <span className="text-muted">businessman, hd wallpapers, abstract, phone, green,
              more...</span>
            </h6>
          </div>
        </div>
        <div className="container-fluid bg-light">
          <div className="row">
            <div className="col-sm-6 col-md-12">
              <h6 className="mt-2">New free stock videos</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-around">
                {this.props.popularVideo === null ? (
                  <p>{"Loading ..."}</p>
                ) : (
                  this.props.popularVideo.videos.map((value, i) => (
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
    popularVideo: store.products.videos
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPopularVideo: () => dispatch(getPopularVideo()),
    getResultSearch: (allProps: IPropsVideosPage) =>
      dispatch(showResultSearchVideo(allProps)),
      watchNameVideoChange:(e:string)=>dispatch(changeNameVideo(e))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage);
