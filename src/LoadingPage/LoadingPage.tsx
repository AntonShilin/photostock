import * as React from "react";
import "./LoadingPage.scss";
import { GoGear } from "react-icons/go";

class LoadingPage extends React.Component {
  public render() {
    return (
      <div className="container-xl mt-5">
        <div className="row">
          <div className="col-12 d-flex justify-content-center gear_icon_bg">
            <div className="gear_icon">
              <GoGear style={{ fontSize: "7rem" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingPage;
