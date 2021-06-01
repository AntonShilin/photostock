import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import Footer from "../../Footer/Footer";
import HeaderAccount from "../../Header/HeaderAccount";
import ModalWindow from "../../ModalWindow/ModalWindow/ModalWindow";
import MyLikesTitle from "./MyLikesTitle/MyLikesTitle";
import MyLikesTitleCollection from "./MyLikesTitleCollection/MyLikesTitleCollection";

export interface IMyLikesProps {
}

export interface IMyLikesState {}

class MyLikes extends React.Component<IMyLikesProps, IMyLikesState> {

  public render() {
    return (
      <>
        <HeaderAccount />
        <ModalWindow/>
        <MyLikesTitle />
        <MyLikesTitleCollection />
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLikes);
