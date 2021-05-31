import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../../Store/Store";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import EmptyCollection from "../../EmptyCollection/EmptyCollection";
import "./MyLikesTitleCollection.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { downloadCollectionOfLikes } from "../../../../Actions/AccountActions";
import Dislike from "../../../SVGIcons/Dislike/Dislike";
import DownloadIcon from "../../../SVGIcons/DownloadIcon/DownloadIcon";
import { MdControlPoint } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import {
  handlePauseVideo,
  handlePreplayVideo,
} from "../../../../Actions/ProductsActions";

export interface IMyLikesTitleCollectionProps {
  collection: any[] | null;
  downloadCollectionOfLikes: typeof downloadCollectionOfLikes;
  identification: string | undefined;
  handlePauseVideo: typeof handlePauseVideo;
  handlePreplayVideo: typeof handlePreplayVideo;
}

export interface IMyLikesTitleCollectionState {}

class MyLikesTitleCollection extends React.Component<
  IMyLikesTitleCollectionProps,
  IMyLikesTitleCollectionState
> {
  public componentDidMount() {
    firebase.auth().onAuthStateChanged((profile: firebase.User | null) => {
      if (profile !== null) {
        this.getLikesFromCollections(profile.uid);
      }
    });
  }

  public getLikesFromCollections = (identification: string) => {
    const db = firebase.firestore();
    const docRef = db.collection("all").doc(identification).collection("likes");

    docRef
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.props.downloadCollectionOfLikes(data);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  public render() {
    const { collection } = this.props;

    if (collection === null) {
      return <LoadingPage />;
    }

    if (collection.length === 0) {
      return <EmptyCollection />;
    }

    return (
      collection !== null &&
      collection.length > 0 && (
        <div className="container-xl mylikes-collection-bg">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              {collection.map(
                (elem, i) =>
                  i % 2 === 0 && (
                    <div className="info-elem" key={i}>
                      {elem.photographer !== null ? (
                        <img src={elem.src} alt="img" />
                      ) : (
                        <div className="video-item">
                          <video
                            controls={false}
                            onMouseOver={(e) =>
                              this.props.handlePreplayVideo(e)
                            }
                            onMouseLeave={(e) => this.props.handlePauseVideo(e)}
                          >
                            <source src={elem.src} type="video/mp4" />
                          </video>
                          <div className="video_btn_control">
                            <AiOutlinePlayCircle />
                          </div>
                        </div>
                      )}
                      <div className="elem-data">
                        <p>
                          {elem.photographer!==null
                            ? elem.photographer
                            : elem.videographer}
                        </p>
                      </div>
                      <span>
                        <a>
                          <DownloadIcon />
                        </a>
                      </span>
                      <span>
                        <MdControlPoint />
                      </span>
                      <span>
                        <Dislike id={elem.id} src={elem.src} />
                      </span>
                    </div>
                  )
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              {collection.map(
                (elem, k) =>
                  k % 2 !== 0 && (
                    <div className="info-elem" key={k}>
                      {elem.photographer === null ? (
                        <div className="video-item">
                          <video
                            controls={false}
                            onMouseOver={(e) =>
                              this.props.handlePreplayVideo(e)
                            }
                            onMouseLeave={(e) => this.props.handlePauseVideo(e)}
                          >
                            <source src={elem.src} type="video/mp4" />
                          </video>
                          <div className="video_btn_control">
                            <AiOutlinePlayCircle />
                          </div>
                        </div>
                      ) : (
                        <img src={elem.src} alt="img" />
                      )}
                      <div className="elem-data">
                        <p>
                          {elem.photographer===null
                            ? elem.videographer
                            : elem.photographer}
                        </p>
                      </div>
                      <span>
                        <a>
                          <DownloadIcon />
                        </a>
                      </span>
                      <span>
                        <MdControlPoint />
                      </span>
                      <span>
                        <Dislike id={elem.id} src={elem.src} />
                      </span>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  collection: state.account.collection,
  identification: state.account.identification,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    downloadCollectionOfLikes: (arr: any) =>
      dispatch(downloadCollectionOfLikes(arr)),
    handlePreplayVideo: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
      dispatch(handlePreplayVideo(e)),
    handlePauseVideo: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) =>
      dispatch(handlePauseVideo(e)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLikesTitleCollection);
