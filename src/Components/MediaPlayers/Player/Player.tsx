import * as React from "react";
import { FiPause, FiPlay } from "react-icons/fi";
import "./Player.scss";

export interface IPlayerProps {
  src: string | undefined;
  poster?: string | undefined;
  type?: string | undefined;
}

export interface IPlayerState {
  isPlay: boolean;
  currentTime: number;
  isLoading: boolean;
  src: undefined | string;
  error: boolean;
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
      src: undefined,
      error: false,
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
      if (x >= 100) {
        this.endedVideo();
        this.setState({ isPlay: false });
      } else {
        this.setState({ currentTime: x });
      }
    }, 100);
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

  public componentDidMount() {
    this.myPlayer.current!.load();
  }

  public componentWillReceiveProps(nextProps: { src: string | undefined }) {
    if (nextProps.src !== this.props.src) {
      this.togglePlayerBtn(false);
      this.endedVideo();
      clearInterval(this.timer);
      this.setState({ error: false });
      this.myPlayer.current!.load();
    }
  }

  public render() {
    const { poster, src, type } = this.props;
    const { isPlay, currentTime, isLoading, error } = this.state;

    return (
      <div className="player_item">
        {isLoading && (
          <div className="spinner">
            <div className="spinner-border text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <span className="err-message">Sorry! Could not load video!</span>
        )}
        <video
          controls={false}
          playsInline={true}
          muted={true}
          ref={this.myPlayer}
          onLoadedData={() => {
            this.setState({ isLoading: false });
          }}
          onLoadStart={() => {
            this.setState({ isLoading: true });
          }}
          onError={() => {
            this.setState({ isLoading: false });
            this.setState({ error: true });
          }}
        >
          <source src={src} type={type !== undefined ? type : "video/mp4"} />
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
              disabled={!isLoading && !error ? false : true}
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
