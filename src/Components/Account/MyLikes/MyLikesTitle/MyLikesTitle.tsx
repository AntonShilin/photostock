import * as React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { IApplicationState } from "../../../../Store/Store";
import "./MyLikesTitle.scss";

export interface Props {
  userName: string;
  collection: any[] | null;
}

export interface State {}

class MyLikesTitle extends React.Component<Props, State> {
  public render() {
    const { userName, collection } = this.props;

    return (
      <div className="container-xl my-likes-title-bg">
        <div className="row">
          <div className="col">
            <div className="my-likes-title">
              <h1>My Likes</h1>
              <p>
                {collection?.length} photo liked by
                <NavLink to="/my-account">
                  <FaRegUserCircle />
                  {userName}
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  userName: state.account.userName,
  collection: state.account.collection,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLikesTitle);
