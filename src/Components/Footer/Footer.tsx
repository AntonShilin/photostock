import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { IApplicationState } from "../../Store/Store";
import "./Footer.scss";

export interface IFooterProps {
  collection: any[] | null;
}

export interface IFooterState {}

class Footer extends React.Component<IFooterProps, IFooterState> {
  public render() {
    const { collection } = this.props;
    return (
      <footer
        className="container-xl"
        style={
        collection === null
            ? { minHeight: "70vh" }
            : {}
        }
      >
        <div className="container-xl">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <NavLink to="/" className="footer_logo btn">
                F
              </NavLink>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3">
              <NavLink to="#">Terms of Use</NavLink>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3">
              <NavLink to="#">Privacy Policy</NavLink>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3">
              <NavLink to="#">License</NavLink>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-3">
              <NavLink to="#">Imprint</NavLink>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  collection: state.account.collection,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
