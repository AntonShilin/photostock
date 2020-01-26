import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import PhotosPage from "./PhotosPage";
import VideosPage from "./VideosPage";
import Header from "./Header";
import NotFoundPage from "./NotFoundPage";
import LoginPage from "./LoginPage";
import { Suspense } from "react";
import ResultPhotoPage from "./ResultPhotoPage";
import ResultVideoPage from "./ResultVideoPage";
import LoadingPage from "./App";
import AdminPage from "./AdminPage";

const RoutesWrap: React.SFC = () => {
  return (
    <Router>
      <Route component={Routes} />
    </Router>
  );
};

const Routes: React.SFC<RouteComponentProps> = props => {
  const [loggedIn, setLoggedIn] = React.useState(true);
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="https://antonshilin.github.io/login" component={LoginPage} />
        <Redirect exact={true} from="/" to="/login" />
        <Route path="https://antonshilin.github.io/photos" exact={true} component={PhotosPage} />
        <Route path="https://antonshilin.github.io/videos" exact={true} component={VideosPage} />
        <Route path="https://antonshilin.github.io/videos/:searchvideo" component={ResultVideoPage} />
        <Route path="https://antonshilin.github.io/photos/:searchphoto" component={ResultPhotoPage} />
        <Route path="/admin">
          {loggedIn ? (
            <Suspense fallback={<LoadingPage />}>
              <AdminPage />
            </Suspense>
          ) : (
            <Redirect to="https://antonshilin.github.io/login" />
          )}
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default RoutesWrap;
