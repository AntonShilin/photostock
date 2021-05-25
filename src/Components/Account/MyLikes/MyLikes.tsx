import * as React from "react";
import Footer from "../../Footer/Footer";
import HeaderAccount from "../../Header/HeaderAccount";
import MyLikesTitle from "./MyLikesTitle/MyLikesTitle";
import MyLikesTitleCollection from "./MyLikesTitleCollection/MyLikesTitleCollection";

export interface IMyLikesProps {}

export interface IMyLikesState {}

class MyLikes extends React.Component<IMyLikesProps, IMyLikesState> {
  public render() {
    return (
      <>
        <HeaderAccount />
        <MyLikesTitle />
        <MyLikesTitleCollection />
        <Footer />
      </>
    );
  }
}

export default MyLikes;
