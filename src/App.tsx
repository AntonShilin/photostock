import * as React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import {
  accountSignIn,
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
}

export interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  
  public componentDidMount() {
    firebase.auth().onAuthStateChanged((profile: any) => {
      if (profile) {
        this.props.setUserName(profile.displayName);
        this.props.accountSignIn(true);
        this.props.setAccountIdentification(profile.uid);
      }
    });
  }

  public render() {
    return (
      <BrowserRouter>
        <Route component={Routes} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserName: (name: string ) => dispatch(setUserName(name)),
    accountSignIn: (value: boolean) => dispatch(accountSignIn(value)),
    setAccountIdentification: (value: string) =>
      dispatch(setAccountIdentification(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
