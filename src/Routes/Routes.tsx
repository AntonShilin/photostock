import * as React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import PhotosPage from "../PhotosPage/PhotosPage";
import VideosPage from "../VideosPage/VideosPage";
import Header from "../Header/Header";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import LoginPage from "../LoginPage/LoginPage";
import { Suspense } from "react";
import ResultPhotoPage from "../ResultPhotoPage/ResultPhotoPage";
import ResultVideoPage from "../ResultVideoPage/ResultVideoPage";
import AdminPage from "../AdminPage/AdminPage";
import LoadingPage from "../LoadingPage/LoadingPage";

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
        <Route path="/login" component={LoginPage} />
        <Redirect exact={true} from="/" to="/photos" />
        <Route path="/photos" exact={true} component={PhotosPage} />
        <Route path="/videos" exact={true} component={VideosPage} />
        <Route path="/videos/:searchvideo" component={ResultVideoPage} />
        <Route path="/photos/:searchphoto" component={ResultPhotoPage} />
        <Route path="/admin">
          {loggedIn ? (
            <Suspense fallback={<LoadingPage />}>
              <AdminPage />
            </Suspense>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default RoutesWrap;
