import firebase from "firebase";
import * as React from "react";
import { IoMdEyeOff } from "react-icons/io";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { accountSignUp, setUserName } from "../../../Actions/AccountActions";
import { getPopularImages } from "../../../Actions/ProductsActions";
import { ICuratedPhoto } from "../../../Interfaces/Interfaces";
import { IApplicationState } from "../../../Store/Store";
import Footer from "../../Footer/Footer";
import "./SignUpPage.scss";

export interface ISignUpPageProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
  accountSignUp: typeof accountSignUp;
  setUserName: typeof setUserName;
  isAccountSignIn: boolean;
}

export interface ISignUpPageState {
  password: string | null;
  email: string | null;
  error: string | null;
  firstName: string | null;
  lastName: string | null;
  accountCreated: boolean;
}

class SignUpPage extends React.Component<ISignUpPageProps, ISignUpPageState> {
  public inputSignUpPassword: React.RefObject<HTMLInputElement>;
  constructor(props: ISignUpPageProps) {
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

  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getPopularImages();
    }
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
    const { data, isAccountSignIn } = this.props;
    const { email, password, firstName, lastName, accountCreated, error } =
      this.state;

    if (accountCreated || isAccountSignIn) {
      return <Redirect to="/my-account" />;
    }

    return (
      <>
        <div className="container-xl sign_up_main">
          <div className="row">
            <div className="col-lg-3 offset-lg-6 col-6">
              <NavLink to="/photos" className="btn">
                F
              </NavLink>
            </div>
            <div className="col-lg-3  col-6">
              <NavLink to="/login" className="sign_in">
                Have an account? <span>Sign In</span>
              </NavLink>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-5 col-md-5 col-sm-12">
              <div className="sign_up_box">
                <h3 className="text-center">Join 12 million others</h3>
                <span>{error}</span>
                <div>
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
                    Create New Account
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-7">
              {data !== null &&
                data.photos.map((elem, i) => (
                  <img src={elem.src.small} key={i} />
                ))}
            </div>
          </div>
        </div>
        <Footer/>
      </>
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
    accountSignUp: (value: boolean) => dispatch(accountSignUp(value)),
    setUserName: (name: string) => dispatch(setUserName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
