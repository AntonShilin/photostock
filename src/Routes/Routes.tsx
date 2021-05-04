import * as React from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import PhotosPage from "../PhotosPage/PhotosPage";
import VideosPage from "../VideosPage/VideosPage";
import NotFoundPage from "../Components/NotFoundPage/NotFoundPage";
import LoginPage from "../Components/LoginPage/LoginPage";
import ResultPhotoPage from "../ResultPhotoPage/ResultPhotoPage";
import ResultVideoPage from "../ResultVideoPage/ResultVideoPage";



const Routes: React.SFC<RouteComponentProps> = props => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Redirect exact={true} path="/" to="/photos" />
        <Route path="/photos" exact={true} component={PhotosPage} />
        <Route path="/videos" exact={true} component={VideosPage} />
        <Route path="/videos/:searchvideo" component={ResultVideoPage} />
        <Route path="/photos/:searchphoto" component={ResultPhotoPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
