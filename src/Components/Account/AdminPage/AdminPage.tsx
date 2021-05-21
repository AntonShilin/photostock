import * as React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { IApplicationState } from "../../../Store/Store";
import Footer from "../../Footer/Footer";
import HeaderAccount from "../../Header/HeaderAccount";
import Collections from "../Collections/Collections";
import "./AdminPage.scss";

export interface IAdminPageProps {
  userName: string | null;
  isAccountSignIn: boolean;
}

export interface IAdminPageState {}

class AdminPage extends React.Component<IAdminPageProps, IAdminPageState> {

  public render() {
    const { userName , isAccountSignIn} = this.props;
    
    if (!isAccountSignIn) {
      return <Redirect to="/sign-up"/>
    }

    return (
      <>
        <HeaderAccount />
        <div className="container-xl admin_page_main">
          <div className="row">
            <div className="col">
              <span>
                <FaRegUserCircle />
              </span>
              <h1>{userName}</h1>
            </div>
          </div>
        </div>
        <Collections/>
        <Footer />
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
