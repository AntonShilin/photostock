import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import "./Collections.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { RouteComponentProps, withRouter } from "react-router-dom";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { FaRegImages } from "react-icons/fa";
import EmptyCollection from "../EmptyCollection/EmptyCollection";
import { downloadCollectionOfLikes } from "../../../Actions/AccountActions";

export interface ICollectionsProps extends RouteComponentProps {
  collection: any[] | null;
  downloadCollectionOfLikes: typeof downloadCollectionOfLikes;
}

export interface ICollectionsState {}

class Collections extends React.Component<
  ICollectionsProps,
  ICollectionsState
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

  public showAllMyLikesPhotos = () => {
    this.props.history.push("/my-likes");
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
        <div className="container-xl collection_main">
          <div className="row title">
            <div className="col">
              <span>Collections</span>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="collection_likes">
                <div className="collection_title">
                  <img
                    className="collection_title_img"
                    src={collection.length > 0 ? collection![0].src : ""}
                    alt="img"
                    onClick={this.showAllMyLikesPhotos}
                  />
                </div>
                <div className="collection_rest">
                  {collection
                    .map(
                      (img, i) =>
                        i > 0 && (
                          <img
                            src={img.src}
                            alt="img"
                            key={i}
                            onClick={this.showAllMyLikesPhotos}
                          />
                        )
                    )
                    .reverse()}
                </div>
                <div className="collection_size">
                  <div>Your likes</div>
                  <div>
                    <FaRegImages />
                    {collection.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  collection: state.account.collection,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    downloadCollectionOfLikes: (arr: any) =>
      dispatch(downloadCollectionOfLikes(arr)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Collections)
);
