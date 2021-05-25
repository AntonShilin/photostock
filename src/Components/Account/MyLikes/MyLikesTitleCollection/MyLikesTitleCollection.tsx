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

export interface IMyLikesTitleCollectionProps {
  collection: any[] | null;
  downloadCollectionOfLikes: typeof downloadCollectionOfLikes;
  identification: string | undefined;
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
                (img, i) =>
                  i % 2 === 0 && (
                    <div className="info-image" key={i}>
                      <img src={img.src} alt="img" />
                      <div className="photographer-data">
                        <p>{img.photographer}</p>
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
                        <Dislike
                          id={img.id}
                          src={img.src}
                          photographer={img.photographer}
                        />
                      </span>
                    </div>
                  )
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              {collection.map(
                (img, k) =>
                  k % 2 !== 0 && (
                    <div className="info-image" key={k}>
                      <img src={img.src} alt="img" />
                      <div className="photographer-data">
                        <p>{img.photographer}</p>
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
                        <Dislike
                          id={img.id}
                          src={img.src}
                          photographer={img.photographer}
                        />
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLikesTitleCollection);