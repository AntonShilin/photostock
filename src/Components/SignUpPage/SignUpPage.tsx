import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPopularImages } from "../../Actions/ProductsActions";
import { ICuratedPhoto } from "../../Interfaces/Interfaces";
import { IApplicationState } from "../../Store/Store";
import "./SignUpPage.scss";

export interface ISignUpPageProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
}

export interface State {}

class SignUpPage extends React.Component<ISignUpPageProps, State> {
  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getPopularImages();
    }
  }

  public render() {
    const { data } = this.props;
    return (
      <div className="container-xl sign_up_main">
        <div className="row">
          <div className="col-lg-3 offset-lg-6 col-6" >
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
              <form>
                <input type="text" placeholder="Enter first name" />
                <input type="text" placeholder="Enter last name" />
                <input type="email" placeholder="Enter email" />
                <input type="password" placeholder="Enter password" />
                <button type="submit" disabled={true}>
                  Create New Account
                </button>
              </form>
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
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getPopularImages: () => dispatch(getPopularImages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
