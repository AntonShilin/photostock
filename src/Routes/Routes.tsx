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
import LoginPage from "../Components/Account/LoginPage/LoginPage";
import ResultPhotoPage from "../ResultPhotoPage/ResultPhotoPage";
import ResultVideoPage from "../ResultVideoPage/ResultVideoPage";
import SignUpPage from "../Components/Account/SignUpPage/SignUpPage";
import AdminPage from "../Components/Account/AdminPage/AdminPage";
import ResetPassword from "../Components/Account/ResetPassword/ResetPassword";
import Settings from "../Components/Account/Settings/Settings";
import MyLikes from "../Components/Account/MyLikes/MyLikes";
import AuthModalWindow from "../Components/Account/AuthModalWindow/AuthModalWindow";



const Routes: React.SFC<RouteComponentProps> = () => {
  return (
    <React.Fragment>
      <Switch>
        <Redirect exact={true} path="/" to="/photos" />
        <Route path="/auth" component={AuthModalWindow} />
        <Route path="/login" component={LoginPage} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/my-account" component={AdminPage} />
        <Route path="/edit-profile" component={Settings} />
        <Route path="/my-likes" component={MyLikes} />
        <Route path="/password" component={ResetPassword} />
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
