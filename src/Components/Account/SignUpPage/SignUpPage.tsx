import firebase from "firebase";
import * as React from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { accountSignUp, setUserName } from "../../../Actions/AccountActions";
import { getPopularImages } from "../../../Actions/ProductsActions";
import { ICuratedPhoto } from "../../../Interfaces/Interfaces";
import { IApplicationState } from "../../../Store/Store";
import "./SignUpPage.scss";

export interface ISignUpPageProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
  accountSignUp: typeof accountSignUp;
  setUserName: typeof setUserName;
  isAccountSignIn: boolean;
}

export interface ISignUpPageState {
  password: string;
  email: string;
  error: boolean;
  firstName: string;
  lastName: string;
  accountCreated: boolean;
}

class SignUpPage extends React.Component<ISignUpPageProps, ISignUpPageState> {
  constructor(props: ISignUpPageProps) {
    super(props);
    this.state = {
      password: "",
      email: "",
      error: false,
      firstName: "",
      lastName: "",
      accountCreated:false,
    };
  }

  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getPopularImages();
    }
  }

  public handleCreateEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const newEmail = e.currentTarget.value;
    this.setState({
      email: newEmail,
    });
  };

  public handleCreatePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const newPassword = e.currentTarget.value;
    this.setState({
      password: newPassword,
    });
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

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.updateUserProfile();
      })
      .catch((error) => {
        this.setState({ error: true });
      });
    };
    
    public updateUserProfile = () => {
      const user = firebase.auth().currentUser;
      if (user !== null) {
        user
        .updateProfile({
          displayName: this.state.firstName + " "+ this.state.lastName,
        })
        .then(() => {
          this.props.accountSignUp(true);
          this.setState({ accountCreated: true });
          this.props.setUserName(this.state.firstName + " " + this.state.lastName);
          console.log("Update successful");
        })
        .catch((error) => {
          console.log("Update error");
        });
    }
  };

  public render() {
    const { data , isAccountSignIn} = this.props;
    const { email, password, firstName,lastName ,accountCreated} = this.state;

    if (accountCreated||isAccountSignIn) {
      return <Redirect to="/my-account" />;
    }

    return (
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
              <h3 className="text-center">Join others</h3>
              <div>
                <input
                  type="text"
                  placeholder="Enter first name"
                  onChange={this.handleCreateFirstName}
                />
                <input type="text" placeholder="Enter last name"
                 onChange={this.handleCreateLastName}
                />
                <input
                  type="email"
                  placeholder="Enter email"
                  onChange={this.handleCreateEmail}
                />
                <input
                  type="password"
                  placeholder="Enter password"
                  onChange={this.handleCreatePassword}
                />
                <button
                  type="submit"
                  disabled={
                    email.trim().length > 0 &&
                    password.trim().length > 0 &&
                    firstName.trim().length > 0 &&
                    lastName.trim().length > 0
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
    setUserName: (name: string|null) => dispatch(setUserName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
