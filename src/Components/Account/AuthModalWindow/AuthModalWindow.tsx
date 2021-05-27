import * as React from "react";
import { IoMdEyeOff } from "react-icons/io";
import { connect } from "react-redux";
import {
  accountSignUp,
  setUserName,
  toggleAuthModalWindow,
} from "../../../Actions/AccountActions";
import { IApplicationState } from "../../../Store/Store";
import "./AuthModalWindow.scss";
import firebase from "firebase";
import { NavLink } from "react-router-dom";

export interface IAuthModalWindowProps {
  accountSignUp: typeof accountSignUp;
  toggleAuthModalWindow: typeof toggleAuthModalWindow;
  setUserName: typeof setUserName;
  isAccountSignIn: boolean;
  isAuthModalWindowOpen: boolean;
}

export interface IAuthModalWindowState {
  password: string | null;
  email: string | null;
  error: string | null;
  firstName: string | null;
  lastName: string | null;
  accountCreated: boolean;
}

class AuthModalWindow extends React.Component<
  IAuthModalWindowProps,
  IAuthModalWindowState
> {
  public inputSignUpPassword: React.RefObject<HTMLInputElement>;
  constructor(props: IAuthModalWindowProps) {
    super(props);
    this.state = {
      password: null,
      email: null,
      error: null,
      firstName: null,
      lastName: null,
      accountCreated: false,
    };
    this.inputSignUpPassword = React.createRef();
  }

  public handleCreateEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const newEmail = e.currentTarget.value;
    if (e.currentTarget.willValidate) {
      this.setState({
        email: newEmail,
        error: e.currentTarget.validationMessage,
      });
    } else {
      this.setState({
        error: e.currentTarget.validationMessage,
      });
    }
  };

  public handleCreatePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const newPassword = e.currentTarget.value;
    if (e.currentTarget.willValidate) {
      this.setState({
        password: newPassword,
        error: e.currentTarget.validationMessage,
      });
    } else {
      this.setState({
        error: e.currentTarget.validationMessage,
      });
    }
  };

  public handleCreateFirstName = (e: React.FormEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;
    this.setState({
      firstName: newName,
    });
  };

  public handleCreateLastName = (e: React.FormEvent<HTMLInputElement>) => {
    const newName = e.currentTarget.value;
    this.setState({
      lastName: newName,
    });
  };

  public createAccount = () => {
    const { email, password } = this.state;

    if (email !== null && password !== null) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.updateUserProfile();
        })
        .catch((err) => {
          this.setState({ error: err.message });
        });
    }
  };

  public updateUserProfile = () => {
    const { firstName, lastName } = this.state;
    const user = firebase.auth().currentUser;
    if (user !== null && firstName !== null && lastName !== null) {
      user
        .updateProfile({
          displayName: firstName + " " + lastName,
        })
        .then(() => {
          this.props.accountSignUp(true);
          this.setState({ accountCreated: true });
          this.props.setUserName(firstName + " " + lastName);
          this.props.toggleAuthModalWindow(false);
        })
        .catch((err) => {
          this.setState({ error: err.message });
        });
    }
  };

  public toggleVisibleSignUpPassword = () => {
    const elem = this.inputSignUpPassword.current!;
    if (elem.type === "password") {
      elem.type = "text";
    } else {
      elem.type = "password";
    }
  };

  public render() {
    const { isAccountSignIn, isAuthModalWindowOpen } = this.props;
    const { email, password, firstName, lastName, accountCreated, error } =
      this.state;

    return (
      isAuthModalWindowOpen && (
        <div className="auth-overloy">
          <div className="auth-modal-header">
            <NavLink to="/photos" className="auth-header-btn">
              F
            </NavLink>
            <NavLink to="/login" className="auth-signin">
              Have an account? <span>Sign In</span>
            </NavLink>
          </div>
          <div className="auth-signup-bg">
            <div className="auth-signup-btn">
              <button
                onClick={() =>
                  this.props.toggleAuthModalWindow(false)
                }
              >
                &#x2A2F;
              </button>
            </div>
            <div className="auth-signup-form">
              <h3 className="text-center">Join 12 million others</h3>
              <p>Sign up to like and collect thousands of free photos.</p>
              <span className="auth-error-msg">{error}</span>
              <div className="auth-signup-form-area">
                <input
                  type="text"
                  placeholder="Enter first name"
                  onChange={this.handleCreateFirstName}
                />
                <input
                  type="text"
                  placeholder="Enter last name"
                  onChange={this.handleCreateLastName}
                />
                <input
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleCreateEmail}
                />
                <input
                  ref={this.inputSignUpPassword}
                  type="password"
                  placeholder="Enter password"
                  onChange={this.handleCreatePassword}
                />
                <IoMdEyeOff onClick={this.toggleVisibleSignUpPassword} />
                <button
                  className="sign_up_btn"
                  disabled={
                    email !== null &&
                    password !== null &&
                    firstName !== null &&
                    lastName !== null
                      ? false
                      : true
                  }
                  onClick={this.createAccount}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  isAccountSignIn: state.account.isAccountSignIn,
  isAuthModalWindowOpen: state.account.isAuthModalWindowOpen,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    accountSignUp: (value: boolean) => dispatch(accountSignUp(value)),
    setUserName: (name: string) => dispatch(setUserName(name)),
    toggleAuthModalWindow: (value: boolean) =>
      dispatch(toggleAuthModalWindow(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthModalWindow);
