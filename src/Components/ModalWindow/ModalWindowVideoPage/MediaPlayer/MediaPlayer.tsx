import * as React from "react";
import { IApplicationState } from "../../../../Store/Store";
import { connect } from "react-redux";
import { IPopularVideos, IVideos } from "../../../../Interfaces/Interfaces";
import { FiPause, FiPlay } from "react-icons/fi";
import "./MediaPlayer.scss";
import { toggleMediaPlayer } from "../../../../Actions/ProductsActions";

export interface IMediaPlayerProps {
  data: IPopularVideos | null;
  id: number | null;
  isPlay: boolean;
  toggleMediaPlayer: typeof toggleMediaPlayer;
}

export interface IMediaPlayerState {
  isPlay: boolean;
}

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
    const { id, isPlay } = this.props;
    const videos: IVideos[] = this.props.data!.videos;

    return (
      <div className="media_player_item">
        {<video
          controls={false}
          muted={true}
          poster={videos[id!].image}
          ref={this.myPlayer}
        >
          <source
            src={videos[id!].video_files[0].link}
            type={videos[id!].video_files[0].file_type}
          />
          Your browser doesn't support HTML5 video tag.
        </video>}
        <button
          className="btn btn-info"
          onClick={() =>
            this.props.toggleMediaPlayer(isPlay, this.myPlayer.current!)
          }
        >
          {isPlay ? <FiPause /> : <FiPlay />}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  data: state.products.videos,
  id: state.products.modalWindowVideoPage.id,
  isPlay: state.products.modalWindowVideoPage.isPlay,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleMediaPlayer: (isPlay: boolean, elem: HTMLVideoElement) =>
      dispatch(toggleMediaPlayer(isPlay, elem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlayer);
