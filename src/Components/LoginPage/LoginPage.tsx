import * as React from "react";
import { NavLink } from "react-router-dom";

export interface Props {}

export interface State {}

class LoginPage extends React.Component<Props, State> {
  public render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">
              Welcome Back
              To Photos & Video stock
            </h3>
          </div>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="col-md-7 col-sm-12">
            <form className="bg-light pr-3 pl-3 pb-3 pt-1 rounded border w-75 d-block mx-auto">
              <NavLink to="/photos" className="close mb-3">
                &times;
              </NavLink>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                disabled={true}
                className="btn btn-success w-100 d-block"
              >
                Sing up
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
