import firebase from "firebase";
import * as React from "react";
import { IoMdEyeOff } from "react-icons/io";
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
  errorMessage: string | null;
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
  public inputPassword: React.RefObject<HTMLInputElement>;
  constructor(props: ILoginPageProps) {
    super(props);
    this.state = {
      password: null,
      email: null,
      errorMessage: null,
    };
    this.inputPassword = React.createRef();
  }

  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getPopularImages();
    }
  }

  public handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const newEmail = e.currentTarget.value;
    if (e.currentTarget.willValidate) {
      this.setState({
        email: newEmail,
        errorMessage: e.currentTarget.validationMessage,
      });
    } else {
      this.setState({
        errorMessage: e.currentTarget.validationMessage,
      });
    }
  };

  public handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const newPassword = e.currentTarget.value;
    if (e.currentTarget.willValidate) {
      this.setState({
        password: newPassword,
      });
    } else {
      this.setState({
        errorMessage: e.currentTarget.validationMessage,
      });
    }
  };

  public handleSignIn = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email!, password!)
      .then(() => {
        this.props.history.push("/my-account");
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message });
      });
  };

  public toggleVisiblePassword = () => {
    const elem = this.inputPassword.current!;
    if (elem.type === "password") {
      elem.type = "text";
    } else {
      elem.type = "password";
    }
  };

  public render() {
    const { data, isAccountSignIn } = this.props;
    const { email, password, errorMessage } = this.state;

    if (isAccountSignIn) {
      return <Redirect to="/my-account" />;
    }

    return (
      <div className="container-xl login_main">
        {data !== null &&
          data.photos.map((elem, i) => <img src={elem.src.medium} key={i} />)}
        <div className="login_window_bg">
          <NavLink to="/photos" className="btn">
            F
          </NavLink>
          <NavLink to="/sign-up" className="sign_up">
            New to Photos & Video stock? <span>Sign Up</span>
          </NavLink>
          <div className="login_box">
            <h3 className="text-center">
              Welcome Back To Photos & Video stock
            </h3>
            <span>{errorMessage}</span>
            <div>
              <input
                type="email"
                placeholder="Enter email"
                onChange={this.handleChangeEmail}
              />
              <input
                ref={this.inputPassword}
                className="password"
                type="password"
                placeholder="Enter password"
                onChange={this.handleChangePassword}
              />
              <IoMdEyeOff onClick={this.toggleVisiblePassword} />
              <button
                disabled={email !== null && password !== null ? false : true}
                onClick={this.handleSignIn}
              >
                Sign In
              </button>
              <NavLink to="#">Forgot your password?</NavLink>
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
    setUserName: (name: string ) => dispatch(setUserName(name)),
    accountSignIn: (value: boolean) => dispatch(accountSignIn(value)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
);
