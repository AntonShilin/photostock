import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import "./Collections.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { FaRegImages } from "react-icons/fa";

export interface ICollectionsProps extends RouteComponentProps {
  collection: any[] | null;
}

export interface ICollectionsState {
}

class Collections extends React.Component<
  ICollectionsProps,
  ICollectionsState
> {

  public showAllMyLikesPhotos = () => {
    this.props.history.push("/my-likes");
  };

  public render() {
    const { collection } = this.props;

    if (collection===null) {
      return (
          <LoadingPage />
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

    return (
      collection !== null && (
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
 
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Collections)
);
