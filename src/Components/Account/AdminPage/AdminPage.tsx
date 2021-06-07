import * as React from "react";
import { FaPencilAlt, FaRegUserCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { IApplicationState } from "../../../Store/Store";
import Footer from "../../Footer/Footer";
import HeaderAccount from "../../Header/HeaderAccount";
import Collections from "../Collections/Collections";
import "./AdminPage.scss";

export interface IAdminPageProps {
  userName: string | null;
  isAccountSignIn: boolean;
}


class AdminPage extends React.Component<IAdminPageProps, {}> {
  public render() {
    const { userName, isAccountSignIn } = this.props;

    if (!isAccountSignIn) {
      return <Redirect to="/sign-up" />;
    }

    return (
      <>
        <HeaderAccount />
        <div className="container-xl admin_page_main">
          <div className="row">
            <div className="col">
              <div className="admin_page_content">
                <div>
                  <FaRegUserCircle />
                </div>
                <div>
                  <h1>{userName}</h1>
                  <NavLink to="/edit-profile">
                    <FaPencilAlt />
                    Complete Your Profile
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Collections />
        <Footer/>
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  userName: state.account.userName,
  isAccountSignIn: state.account.isAccountSignIn,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
