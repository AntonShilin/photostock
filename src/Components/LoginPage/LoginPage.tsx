import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPopularImages } from "../../Actions/ProductsActions";
import { ICuratedPhoto } from "../../Interfaces/Interfaces";
import { IApplicationState } from "../../Store/Store";
import "./LoginPage.scss";

export interface ILoginPageProps {
  data: ICuratedPhoto | null;
  getPopularImages: typeof getPopularImages;
}

export interface State {}

class LoginPage extends React.Component<ILoginPageProps, State> {
  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getPopularImages();
    }
  }

  public render() {
    const { data } = this.props;

    return (
      <div className="container-xl login_main">
        {data !== null &&
          data.photos.map((elem, i) => <img src={elem.src.medium} key={i} />)}
        <div className="login_window_bg">
          <NavLink to="/photos" className="text-decoration-none btn">
            F
          </NavLink>
          <NavLink to="/sign-up" className="sign_up">
            New to Photos & Video stock? <span>Sign Up</span>
          </NavLink>
          <div className="login_box">
            <h3 className="text-center">
              Welcome Back To Photos & Video stock
            </h3>
            <form>
              <NavLink to="/photos">&times;</NavLink>
              <input type="email" placeholder="Enter email" />
              <input type="password" placeholder="Enter password" />
              <button type="submit" disabled={true}>
                Sign In
              </button>
            </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
