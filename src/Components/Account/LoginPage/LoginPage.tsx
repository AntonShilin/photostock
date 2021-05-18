import firebase from "firebase";
import * as React from "react";
import { connect } from "react-redux";
import {
  NavLink,
  Redirect,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { accountSignIn, setUserName } from "../../../Actions/AccountActions";
import { getPopularImages } from "../../../Actions/ProductsActions";
import { ICuratedPhoto } from "../../../Interfaces/Interfaces";
import { IApplicationState } from "../../../Store/Store";
import "./LoginPage.scss";

export interface ILoginPageProps extends RouteComponentProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
  setUserName: typeof setUserName;
  accountSignIn: typeof accountSignIn;
  isAccountSignIn: boolean;
}

export interface ILoginPageState {
  password: string | null;
  email: string | null;
  error: boolean;
  errorMessage: string | null;
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  constructor(props: ILoginPageProps) {
    super(props);
    this.state = {
      password: null,
      email: null,
      error: false,
      errorMessage: null,
    };
  }

  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getPopularImages();
    }

    firebase.auth().onAuthStateChanged((profile: any) => {
      if (profile) {
        this.props.setUserName(profile.displayName);
        this.props.accountSignIn(true);
      }
    });
  }

  public handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const newEmail = e.currentTarget.value;
    this.setState({
      email: newEmail,
    });
  };

  public handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const newPassword = e.currentTarget.value;
    this.setState({
      password: newPassword,
    });
  };

  public handleSignIn = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email!, password!)
      .then((userCredential) => {
        this.props.history.push("/my-account");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        this.setState({ errorMessage });
      });
  };

  public render() {
    const { data , isAccountSignIn} = this.props;
    const { email, password, errorMessage } = this.state;

    if (isAccountSignIn) {
      return <Redirect to="/my-account"/>
    }

    return (
      <div className="container-xl login_main">
        {data !== null &&
          data.photos.map((elem, i) => <img src={elem.src.medium} key={i} />)}
        <div className="login_window_bg">
          <NavLink to="/photos" className="text-decoration-none btn">
            F
          </NavLink>
          <NavLink to="/sign-up" className="sign_up">
            New to Photos & Video stock? <span>Sign Up</span>
          </NavLink>
          <div className="login_box">
            <h3 className="text-center">
              Welcome Back To Photos & Video stock
            </h3>
            <div>
              <NavLink to="/photos">&times;</NavLink>
              <input
                type="email"
                placeholder="Enter email"
                onChange={this.handleChangeEmail}
              />
              <input
                type="password"
                placeholder="Enter password"
                onChange={this.handleChangePassword}
              />
              <button
                disabled={email !== null && password !== null ? false : true}
                onClick={this.handleSignIn}
              >
                Sign In
              </button>
              {errorMessage !== null && <p>{errorMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  data: state.products.data,
  isAccountSignIn: state.account.isAccountSignIn,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPopularImages: () => dispatch(getPopularImages()),
    setUserName: (name: string|null) => dispatch(setUserName(name)),
    accountSignIn: (value: boolean) => dispatch(accountSignIn(value)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
