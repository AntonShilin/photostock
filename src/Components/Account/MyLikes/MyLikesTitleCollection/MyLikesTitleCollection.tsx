import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../../Store/Store";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import EmptyCollection from "../../EmptyCollection/EmptyCollection";
import "./MyLikesTitleCollection.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { downloadCollectionOfLikes } from "../../../../Actions/AccountActions";
import { MdControlPoint } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { toggleModalWindow } from "../../../../Actions/ModalWindowActions";
import Heart from "../../../SVGIcons/Heart/Heart";
import DownloadIcon from "../../../SVGIcons/DownloadIcon/DownloadIcon";

export interface IMyLikesTitleCollectionProps {
  collection: any[] | null;
  downloadCollectionOfLikes: typeof downloadCollectionOfLikes;
  identification: string | undefined;
  toggleModalWindow: typeof toggleModalWindow;
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
            {collection.map((elem, i) => (
              <div className="col-lg-6 col-md-6 col-12" key={i}>
                <div className="info-elem">
                  {elem.photographer !== null ? (
                    <img
                      src={elem.src}
                      alt="img"
                      onClick={() =>
                        this.props.toggleModalWindow(true, i, collection)
                      }
                    />
                  ) : (
                    <div className="video-item">
                      <video
                        controls={false}
                        onClick={() =>
                          this.props.toggleModalWindow(true, i, collection)
                        }
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
                      {elem.photographer !== null
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
                    <Heart
                      liked={true}
                      id={elem.id}
                      src={elem.src}
                      photographer={elem.photographer}
                      videographer={elem.videographer}
                    />
                  </span>
                </div>
              </div>
            ))}
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
    toggleModalWindow: (value: boolean, id: number, collection: any[] | null) =>
      dispatch(toggleModalWindow(value, id, collection)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLikesTitleCollection);
