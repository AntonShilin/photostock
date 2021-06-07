import * as React from "react";
import "./DownloadIcon.scss";


class Download extends React.Component<{}, {}> {
  public render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="2rem"
        height="2rem"
        fill="white"
        strokeWidth="2"
        version="1.1"
        viewBox="0 -25 100 100"
      >
        <g>
          <path d="M72.2,43.2L58,57.4V17c0-2.2-1.8-4-4-4s-4,1.8-4,4v40.4L35.8,43.2c-1.6-1.6-4.1-1.6-5.7,0c-1.6,1.6-1.6,4.1,0,5.7l21,21   C52,70.7,53,71,54,71s2-0.4,2.8-1.2l21-21c1.6-1.6,1.6-4.1,0-5.7C76.3,41.6,73.8,41.6,72.2,43.2z" />
        </g>
      </svg>
    );
  }
}

export default Download;
