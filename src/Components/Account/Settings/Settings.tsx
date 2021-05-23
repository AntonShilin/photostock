import * as React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import HeaderAccount from "../../Header/HeaderAccount";
import "./Settings.scss";

export interface ISettingsProps {}

export interface ISettingsState {}

class Settings extends React.Component<ISettingsProps, ISettingsState> {
  public render() {
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
                    <input type="text" name="" id="fullname" />
                  </div>
                  <div className="settings-email">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="" id="email" />
                  </div>
                  <div className="settings-delete-account">
                    <label>Delete your account</label>
                    <NavLink to="#">
                      Delete your account (You can't undo this!)
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Settings;
