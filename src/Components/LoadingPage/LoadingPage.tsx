import * as React from "react";
import "./LoadingPage.scss";

class LoadingPage extends React.Component {
  public render() {
    return (
      <div className="loading-page-border">
        <div className="loading_page_bg">
          <div className="loading_page_item">
            <div className="loading_page_spinner" />
          </div>
        </div>
      </div>
    );
  }
}

export default LoadingPage;
