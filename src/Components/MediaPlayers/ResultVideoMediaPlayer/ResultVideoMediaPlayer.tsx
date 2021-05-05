import * as React from "react";
import { IApplicationState } from "../../../Store/Store";
import { connect } from "react-redux";
import { IPopularVideos, IVideos } from "../../../Interfaces/Interfaces";
import { FiPause, FiPlay } from "react-icons/fi";
import "./ResultVideoMediaPlayer.scss";
import {
  toggleBtnMediaPlayer,
  stopMediaPlayer,
  startMediaPlayer,
  pauseMediaPlayer,
} from "../../../Actions/ProductsActions";

export interface IResultVideoMediaPlayerProps {
  resultSearchVideo: IPopularVideos | null;
  id: number;
  isOpen: boolean;
  isPlay: boolean;
  toggleBtnMediaPlayer: typeof toggleBtnMediaPlayer;
  stopMediaPlayer: typeof stopMediaPlayer;
  startMediaPlayer: typeof startMediaPlayer;
  pauseMediaPlayer: typeof pauseMediaPlayer;
  currentTime: number;
  timer: any;
}

export interface IState {}

class ResultVideoMediaPlayer extends React.Component<
  IResultVideoMediaPlayerProps,
  IState
> {
  private myPlayer: React.RefObject<HTMLVideoElement>;
  constructor(props: IResultVideoMediaPlayerProps) {
    super(props);
    this.myPlayer = React.createRef();
  }

  public render() {
    const { id, isPlay, currentTime } = this.props;
    const videos: IVideos[] = this.props.resultSearchVideo!.videos;
    if (currentTime >= 100) {
      this.props.stopMediaPlayer();
    }

    return (
      <div className="result_media_player_item">
        {videos.length > 0 && (
          <video
            controls={false}
            muted={true}
            poster={videos[id].image}
            ref={this.myPlayer}
            src={videos[id].video_files[0].link}
          >
            Your browser doesn't support HTML5 video tag.
          </video>
        )}
        <div className="result_media_player_control_panel">
          {isPlay ? (
            <button
              onClick={() => {
                this.props.pauseMediaPlayer(this.myPlayer.current!);
                this.props.toggleBtnMediaPlayer(false);
              }}
            >
              <FiPause />
            </button>
          ) : (
            <button
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
  resultSearchVideo: state.products.resultSearchVideo,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultVideoMediaPlayer);
