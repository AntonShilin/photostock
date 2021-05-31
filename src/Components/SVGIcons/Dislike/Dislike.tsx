import * as React from "react";
import { handleLikeHeart } from "../../../Actions/ProductsActions";
import { connect } from "react-redux";
import "./Dislike.scss";
import { IApplicationState } from "../../../Store/Store";
import firebase from "firebase";

export interface IDislakeProps {
  handleLikeHeart: typeof handleLikeHeart;
  id: number;
  src: string;
  identification: string | undefined;
}

export interface IDislakeState {
  isLiked: boolean;
}

class Heart extends React.Component<IDislakeProps, IDislakeState> {
  constructor(props: IDislakeProps) {
    super(props);
    this.state = {
      isLiked: true,
    };
  }

  public deleteImageFromMyLikesCollection = (id: number) => {
    const { identification } = this.props;
    if (identification !== undefined) {
      const db = firebase.firestore();
      const docRef = db
        .collection("all")
        .doc(identification)
        .collection("likes");
      docRef.doc(id.toString()).delete();
    }
  };

  public currentImageIsLiked = () => {
    this.setState({
      isLiked: !this.state.isLiked,
    });
  };

  public render() {
    const { isLiked } = this.state;
    const { id } = this.props;
    
    return (
      <svg
        className={isLiked ? `like`:`like dislike`}
        viewBox="0 -2 35 35"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="1.6em"
        height="1.3em"
        onClick={(e) => {
          // this.props.handleLikeHeart(e);
          this.deleteImageFromMyLikesCollection(id);
          this.currentImageIsLiked();
        }}
      >
        <path
          d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
        />
      </svg>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  identification: state.account.identification,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleLikeHeart: (e: React.MouseEvent<SVGSVGElement>) =>
      dispatch(handleLikeHeart(e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Heart);