import * as React from "react";

// export interface State {

// }

class VideosPage extends React.Component {


public componentDidMount() {
  alert("A")
}

  public render() {
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
                // value={this.props.search}
                // onChange={this.props.watchInputChange}
                // onKeyDown={this.props.getKeyNumber}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success"
                  type="submit"
                  //   onClick={() => this.props.goByTheNameOfTheSearch(this.props)}
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
              {/* <div className="d-flex flex-wrap align-content-around">
                {this.props.data === null ? (
                  <p>{"Loading ..."}</p>
                ) : (
                  this.props.data.photos.map((image, i) => (
                    <div key={i} className="p-2">
                      <img src={image.src.medium} className="img-fluid" />
                    </div>
                  ))
                )}
              </div> */}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default VideosPage;
