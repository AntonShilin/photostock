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
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Suspense } from "react";
import ResultPhotoPage from "./ResultPhotoPage";
import ResultVideoPage from "./ResultVideoPage";

const AdminPage = React.lazy(() => import("./AdminPage"));

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
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition
          key={props.location.key}
          timeout={500}
          classNames="animate"
        >
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Redirect exact={true} from="/" to="/login" />
            <Route path="/photos" exact={true} component={PhotosPage} />
            <Route path="/videos" exact={true} component={VideosPage} />
            <Route path="/videos/:id" component={ResultVideoPage} />
            <Route path="/photos/:id" component={ResultPhotoPage} />
            <Route path="/admin">
              {loggedIn ? (
                <Suspense
                  fallback={<div className="page-container">Loading...</div>}
                >
                  <AdminPage />
                </Suspense>
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default RoutesWrap;
