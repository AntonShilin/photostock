import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import "./Collections.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { downloadCollectionOfLikes } from "../../../Actions/AccountActions";
import { NavLink, Redirect } from "react-router-dom";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { FaRegImages } from "react-icons/fa";

export interface ICollectionsProps {
  collection: any[] | null;
  downloadCollectionOfLikes: typeof downloadCollectionOfLikes;
}

export interface ICollectionsState {
  isLoading: boolean;
}

class Collections extends React.Component<
  ICollectionsProps,
  ICollectionsState
> {
  constructor(props: ICollectionsProps) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  public componentDidMount() {
    firebase.auth().onAuthStateChanged((profile: any) => {
      if (profile) {
        this.getLikesFromCollections(profile.uid);
      }
    });
  }

  public loadingDownloadCollections = (value: boolean) => {
    this.setState({
      isLoading: value,
    });
  };

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
        this.loadingDownloadCollections(true);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
        return <Redirect to="/" />;
      });
  };

  public render() {
    const { collection } = this.props;
    const { isLoading } = this.state;

    if (!isLoading) {
      return (
        <div className="waiting-download-collection">
         <LoadingPage />
        </div>
       );
    }

    if (collection !== null && collection.length === 0) {
      return (
        <div className="container-xl empty-collection-bg">
          <div className="row">
            <div className="col">
              <h2>You Haven't Liked Any Photos Yet</h2>
              <span>
                Discover amazing pictures and like them, to download them later,
                share them with your colleagues or use it to make your favourite
                photographer happy.
              </span>
              <NavLink to="/">Discover photos</NavLink>
            </div>
          </div>
        </div>
      );
    }

    if (collection !== null && collection.length > 0) {
      return (
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
                  />
                </div>
                <div className="collection_rest">
                  {collection
                    .map((img, i) => <img src={img.src} alt="img" key={i} />)
                    .reverse()}
                </div>
                <div className="collection_size">
                  <div>Your likes</div>
                  <div><FaRegImages/>{collection.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
