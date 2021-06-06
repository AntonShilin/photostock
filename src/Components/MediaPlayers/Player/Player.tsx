import * as React from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import "./Player.scss";

export interface IPlayerProps {
  src: string | undefined;
}

export interface IPlayerState {
  isPlay: boolean;
  currentTime: number;
  isLoading: boolean;
}

class Player extends React.Component<IPlayerProps, IPlayerState> {
  private myPlayer: React.RefObject<HTMLVideoElement>;
  private timer: any;
  constructor(props: IPlayerProps) {
    super(props);
    this.state = {
      isPlay: false,
      currentTime: 0,
      isLoading: false,
    };
    this.timer = 0;
    this.myPlayer = React.createRef();
  }

  public togglePlayerBtn = (value: boolean) => {
    this.setState({
      isPlay: value,
    });
  };

  public startVideo = () => {
    const node = this.myPlayer.current!;
    node.play();
    this.timer = setInterval(() => {
      const durVideo: number = node.duration;
      const t: number = node.currentTime;
      const x: number = (t * 100) / durVideo;
      console.log(node.played);
      if (x >= 100) {
        this.endedVideo();
        this.setState({ isPlay: false });
      } else {
        this.setState({ currentTime: x });
      }
    }, 100);
    console.log(this.myPlayer);
  };

  public endedVideo = () => {
    const node = this.myPlayer.current!;
    node.currentTime = 0;
    this.setState({ currentTime: 0 });
    clearInterval(this.timer);
  };

  public pauseVideo = () => {
    const node = this.myPlayer.current!;
    node.pause();
    clearInterval(this.timer);
  };

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public render() {
    const { src } = this.props;
    const { isPlay, currentTime, isLoading } = this.state;

    return (
      <div className="player_item">
        {isLoading && (
          <div className="spinner">
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        <video
          controls={false}
          muted={true}
          ref={this.myPlayer}
          onLoadedData={() => this.setState({ isLoading: false })}
          onLoadStart={() => this.setState({ isLoading: true })}
        >
          <source src={src} type="video/mp4" />
          Your browser doesn't support HTML5 video tag.
        </video>
        <div className="player_control_panel">
          {isPlay ? (
            <button
              onClick={() => {
                this.pauseVideo();
                this.togglePlayerBtn(false);
              }}
            >
              <FiPause />
            </button>
          ) : (
            <button
              onClick={() => {
                this.startVideo();
                this.togglePlayerBtn(true);
              }}
            >
              <FiPlay />
            </button>
          )}
          <div className="line_item">
            <div className="line">
              <div className="linebar" style={{ width: currentTime + "%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Player;