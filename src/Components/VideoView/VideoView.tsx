import * as React from "react";
import "./VideoView.scss";

export interface IVideoViewProps {
  src: string;
  poster?: string;
}

export interface IVideoViewState {}

class VideoView extends React.Component<IVideoViewProps, IVideoViewState> {
  public startPrevPlayVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };

  public pausePrevPlayVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
  };

  public render() {
    const { src, poster } = this.props;
    return (
      <video
        className="video-view-item"
        poster={poster}
        controls={false}
        muted={true}
        onMouseOver={this.startPrevPlayVideo}
        onMouseLeave={this.pausePrevPlayVideo}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/ogg" />
      </video>
    );
  }
}

export default VideoView;
