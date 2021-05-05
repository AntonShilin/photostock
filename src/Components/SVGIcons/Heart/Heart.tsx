import * as React from "react";
import { handleLikeHeart } from "../../../Actions/ProductsActions";
import { connect } from "react-redux";
import "./Heart.scss";

export interface IHeartProps {
  handleLikeHeart: typeof handleLikeHeart;
}

export interface State {}

class Heart extends React.Component<IHeartProps, State> {

  public render() {
    return (
      <svg
        className="heart"
        viewBox="0 -2 35 35"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="1.6em"
        height="1.3em"
        onClick={(e) => this.props.handleLikeHeart(e)}
      >
        <path
          d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
        />
      </svg>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleLikeHeart: (e: React.MouseEvent<SVGSVGElement>) =>
      dispatch(handleLikeHeart(e)),
  };
};

export default connect(null, mapDispatchToProps)(Heart);
