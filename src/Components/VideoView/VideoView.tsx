import * as React from "react";
import "./VideoView.scss";

export interface IVideoViewProps {
  src: string;
  poster: string | null;
  type?: string | undefined;
}

class VideoView extends React.Component<IVideoViewProps, {}> {
  public startPrevPlayVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };

  public pausePrevPlayVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
  };

  public render() {
    const { src, poster, type } = this.props;
    return (
      <video
        className="video-view-item"
        poster={poster !== null ? poster : undefined}
        playsInline={true}
        controls={false}
        muted={true}
        onMouseOver={this.startPrevPlayVideo}
        onMouseLeave={this.pausePrevPlayVideo}
      >
        <source src={src} type={type !== undefined ? type : "video/mp4"} />
      </video>
    );
  }
}

export default VideoView;
