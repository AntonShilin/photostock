import * as React from "react";
import "./LoadingPage.scss";

class LoadingPage extends React.Component {
  public render() {
    return (
      <div className="container mt-5">
        <img
          className="gear mx-auto d-block"
          src={require("../media/gear.svg")}
          alt=""
        />
      </div>
    );
  }
}

export default LoadingPage;
