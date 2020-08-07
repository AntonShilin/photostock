import * as React from "react";
import { IApplicationState } from "../../../../Store/Store";
import { connect } from "react-redux";
import { IPopularVideos, IVideos } from "../../../../Interfaces/Interfaces";
import { FiPause, FiPlay } from "react-icons/fi";
import "./MediaPlayer.scss";
import {
  toggleBtnMediaPlayer,
  stopMediaPlayer,
  startMediaPlayer,
  pauseMediaPlayer,
} from "../../../../Actions/ProductsActions";

export interface IMediaPlayerProps {
  data: IPopularVideos | null;
  id: number[];
  isOpen: boolean;
  isPlay: boolean;
  toggleBtnMediaPlayer: typeof toggleBtnMediaPlayer;
  stopMediaPlayer: typeof stopMediaPlayer;
  startMediaPlayer: typeof startMediaPlayer;
  pauseMediaPlayer: typeof pauseMediaPlayer;
  currentTime: number;
  timer: any;
}

export interface IMediaPlayerState {}

class MediaPlayer extends React.Component<
  IMediaPlayerProps,
  IMediaPlayerState
> {
  private myPlayer: React.RefObject<HTMLVideoElement>;
  constructor(props: IMediaPlayerProps) {
    super(props);
    this.myPlayer = React.createRef();
  }

  public render() {
    const { id, isPlay, currentTime } = this.props;
    const videos: IVideos[] = this.props.data!.videos;
    if (currentTime >= 100) {
      this.props.stopMediaPlayer();
    }

    return (
      <div className="media_player_item">
        <video
          controls={false}
          muted={true}
          poster={videos[id[0]].image}
          ref={this.myPlayer}
          src={videos[id[0]].video_files[0].link}
        >
          Your browser doesn't support HTML5 video tag.
        </video>
        <div className="media_player_control_panel">
          {isPlay ? (
            <button
              className="btn"
              onClick={() => {
                this.props.pauseMediaPlayer(this.myPlayer.current!);
                this.props.toggleBtnMediaPlayer(false);
              }}
            >
              <FiPause />
            </button>
          ) : (
            <button
              className="btn"
              onClick={() => {
                this.props.startMediaPlayer(this.myPlayer.current!);
                this.props.toggleBtnMediaPlayer(true);
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

const mapStateToProps = (state: IApplicationState) => ({
  data: state.products.videos,
  id: state.products.modalWindowVideoPage.id,
  isPlay: state.products.modalWindowVideoPage.isPlay,
  isOpen: state.products.modalWindowVideoPage.isOpen,
  timer: state.products.modalWindowVideoPage.timer,
  currentTime: state.products.modalWindowVideoPage.currentTime,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleBtnMediaPlayer: (value: boolean) =>
      dispatch(toggleBtnMediaPlayer(value)),
    stopMediaPlayer: () => dispatch(stopMediaPlayer()),
    startMediaPlayer: (elem: HTMLVideoElement) =>
      dispatch(startMediaPlayer(elem)),
    pauseMediaPlayer: (elem: HTMLVideoElement) =>
      dispatch(pauseMediaPlayer(elem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
