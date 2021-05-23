import * as React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, Redirect } from "react-router-dom";
import Footer from "../../Footer/Footer";
import HeaderAccount from "../../Header/HeaderAccount";
import "./Settings.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { setUserEmail, setUserName } from "../../../Actions/AccountActions";
import { IApplicationState } from "../../../Store/Store";
import { connect } from "react-redux";

export interface ISettingsProps {
  setUserEmail: typeof setUserEmail;
  setUserName: typeof setUserName;
  userEmail: string;
  userName: string;
}

export interface ISettingsState {
  password: string | null;
  email: string | null;
  errorMessage: string | null;
  newUserName: string;
  updateSuccess: boolean;
  cancelUpdate: boolean;
}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
  constructor(props: ISettingsProps) {
    super(props);
    this.state = {
      password: null,
      email: null,
      errorMessage: null,
      newUserName: "",
      updateSuccess: false,
      cancelUpdate: false,
    };
  }

  public componentDidMount() {
    firebase.auth().onAuthStateChanged((profile: any) => {
      if (profile) {
        this.props.setUserEmail(profile.email);
      }
    });
  }

  public handleChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const newEmail = e.currentTarget.value;
    if (e.currentTarget.willValidate) {
      this.props.setUserEmail(newEmail);
      this.setState({
        errorMessage: e.currentTarget.validationMessage,
      });
    } else {
      this.setState({
        errorMessage: e.currentTarget.validationMessage,
      });
    }
  };

  public handleChangeUserName = (e: React.FormEvent<HTMLInputElement>) => {
    const newUserName = e.currentTarget.value;
    if (e.currentTarget.willValidate) {
      this.props.setUserName(newUserName);
      this.setState({
        errorMessage: e.currentTarget.validationMessage,
      });
    } else {
      this.setState({
        errorMessage: e.currentTarget.validationMessage,
      });
    }
  };

  public updateProfileCurrentUser = () => {
    const { userName } = this.props;
    const user = firebase.auth().currentUser;
    if (user !== null) {
      user
        .updateProfile({
          displayName: userName,
        })
        .then(() => {
          this.setState({
            updateSuccess: true,
          });
        })
        .catch((err) => {
          this.setState({
            errorMessage: err.message,
          });
        });
    }
  };

  public cancelUpdateProfile = () => {
    this.setState({
      cancelUpdate: true,
    });
  };

  public render() {
    const { userEmail, userName } = this.props;
    const { updateSuccess, cancelUpdate } = this.state;

    if (updateSuccess || cancelUpdate) {
      return <Redirect to="/my-account" />;
    }

    return (
      <>
        <HeaderAccount />
        <div className="container-xl settings-bg">
          <div className="row">
            <div className="col">
              <div className="settings-form">
                <h1>Edit Your Profile</h1>
                <form action="#">
                  <div className="avatar">
                    <p>Avatar</p>
                    <FaRegUserCircle />
                  </div>
                  <div className="settings-fullname">
                    <label htmlFor="fullname">Fullname</label>
                    <input
                      type="text"
                      id="fullname"
                      value={userName}
                      onChange={this.handleChangeUserName}
                    />
                  </div>
                  <div className="settings-email">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={userEmail}
                      onChange={this.handleChangeEmail}
                    />
                  </div>
                  <div className="settings-delete-account">
                    <label>Delete your account</label>
                    <NavLink to="#">
                      Delete your account (You can't undo this!)
                    </NavLink>
                  </div>
                  <div className="setting-update-account">
                    <NavLink to="#" onClick={this.updateProfileCurrentUser}>
                      Update Profile
                    </NavLink>
                    <NavLink to="#" onClick={this.cancelUpdateProfile}>
                      Cancel
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  userEmail: state.account.userEmail,
  userName: state.account.userName,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserEmail: (value: string) => dispatch(setUserEmail(value)),
    setUserName: (value: string) => dispatch(setUserName(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
