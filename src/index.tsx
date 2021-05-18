import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { Store } from "redux";
import configureStore from "./Store/Store";
import { IApplicationState } from "./Store/Store";
import App from "./App";
import firebase from "firebase/app";

interface IProps {
  store: Store<IApplicationState>;
}

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCILtvGYorUxEkxPWoMX_xe-UYlkd5FZI8",
  authDomain: "photoandvideo-b979e.firebaseapp.com",
  databaseURL: "https://photoandvideo-b979e.firebaseio.com",
  projectId: "photoandvideo-b979e",
  storageBucket: "photoandvideo-b979e.appspot.com",
  messagingSenderId: "494143183397",
  appId: "1:494143183397:web:4fa62ab79051900babbdcc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const Root: React.SFC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <App/>
    </Provider>
  );
};

const store = configureStore();

ReactDOM.render(<Root store={store}/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
