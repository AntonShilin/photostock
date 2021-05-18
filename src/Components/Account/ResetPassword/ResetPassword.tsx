import firebase from "firebase";
import * as React from "react";
import { NavLink } from "react-router-dom";
import "./ResetPassword.scss";

export interface IResetPasswordProps {}

export interface IResetPasswordState {
  email: null | string;
  error: null | string;
}

class ResetPassword extends React.Component<
  IResetPasswordProps,
  IResetPasswordState
> {
  constructor(props: IResetPasswordProps) {
    super(props);
    this.state = {
      email: null,
      error: null,
    };
  }

  public enterEmailForSend = (e: React.FormEvent<HTMLInputElement>) => {
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

  public sendEmailForResetPassword = () => {
    const user = firebase.auth();
    const emailAddress = this.state.email;
  };

  public render() {
    const { email, error } = this.state;

    return (
      <div className="container-xl reset_password_main">
        <div className="reset_password_bg">
          <NavLink to="/photos" className="btn">
            F
          </NavLink>
          <NavLink to="/login" className="sign_in">
            Already using Photos & Video stock? <span>Sign In</span>
          </NavLink>
          <div className="reset_password_box">
            <h3>Reset Password</h3>
            <div>
              {error && <p>{error}</p>}
              <input
                className={error ? "err" : ""}
                type="email"
                placeholder="Enter email"
                onChange={this.enterEmailForSend}
              />
              <button
                onClick={this.sendEmailForResetPassword}
                disabled={email !== null ? false : true}
              >
                Send Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
