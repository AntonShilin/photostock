import * as React from "react";
import "./LoadingPage.scss";

class LoadingPage extends React.Component {
  public render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <img
              className="gear mx-auto d-block"
              src={require("../media/gear.svg")}
              alt="gear"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingPage;
