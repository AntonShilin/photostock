import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import {
  accountSignIn,
  downloadCollectionOfLikes,
  setAccountIdentification,
  setUserName,
} from "./Actions/AccountActions";
import Routes from "./Routes/Routes";
import { IApplicationState } from "./Store/Store";
import firebase from "firebase/app";
import "firebase/firestore";

export interface IAppProps {
  setUserName: typeof setUserName;
  accountSignIn: typeof accountSignIn;
  setAccountIdentification: typeof setAccountIdentification;
  downloadCollectionOfLikes: typeof downloadCollectionOfLikes;
}

export interface IAppState {
}

class App extends React.Component<IAppProps, IAppState> {

  public componentDidMount() {
    firebase.auth().onAuthStateChanged((profile:firebase.User|null) => {
      if (profile!==null) {
        this.props.setUserName(profile.displayName!);
        this.props.accountSignIn(true);
        this.props.setAccountIdentification(profile.uid);
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
    return (
        <BrowserRouter>
          <Route component={Routes} />
        </BrowserRouter>
      )
  }
}

const mapStateToProps = (state: IApplicationState) => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserName: (name: string) => dispatch(setUserName(name)),
    accountSignIn: (value: boolean) => dispatch(accountSignIn(value)),
    setAccountIdentification: (value: string) =>
      dispatch(setAccountIdentification(value)),
      downloadCollectionOfLikes: (arr: any) =>
      dispatch(downloadCollectionOfLikes(arr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
