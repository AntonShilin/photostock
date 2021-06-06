import * as React from "react";
import { handleLikeHeart } from "../../../Actions/ProductsActions";
import { connect } from "react-redux";
import "./Collect.scss";
import { IApplicationState } from "../../../Store/Store";
import firebase from "firebase";
import { toggleAuthModalWindow } from "../../../Actions/AccountActions";

export interface ICollectProps {
  handleLikeHeart: typeof handleLikeHeart;
  toggleAuthModalWindow: typeof toggleAuthModalWindow;
  id: number;
  src: string;
  photographer: string | null;
  videographer: string | null;
  isAccountSignIn: boolean;
  identification: string | undefined;
  liked: boolean;
}

export interface ICollectState {
  isLiked: boolean;
}

class Collect extends React.Component<ICollectProps, ICollectState> {
  constructor(props: ICollectProps) {
    super(props);
    this.state = {
      isLiked: false,
    };
  }

  public componentDidMount() {
    const { liked } = this.props;
    this.setState({ isLiked: liked });
  }

//   public addToMyCollectionOfLikes = () => {
//     const { identification, id, src, photographer, videographer } = this.props;
//     const db = firebase.firestore();
//     if (identification !== undefined) {
//       db.collection("all")
//         .doc(identification)
//         .collection("likes")
//         .doc(id.toString())
//         .set({
//           id,
//           src,
//           photographer,
//           videographer,
//         })
//         .then(() => {
//           console.log("Add to likes collection successfully!");
//         })
//         .catch((error) => {
//           console.error("Error adding to collection:", error);
//         });
//     }
//   };

//   public deleteFromMyCollectionOfLikes = (id: number) => {
//     const { identification } = this.props;
//     if (identification !== undefined) {
//       const db = firebase.firestore();
//       const docRef = db
//         .collection("all")
//         .doc(identification)
//         .collection("likes");
//       docRef.doc(id.toString()).delete();
//     }
//   };

  public currentElemIsLiked = () => {
    this.setState({
      isLiked: !this.state.isLiked,
    });
  };

  public render() {
    const { isLiked } = this.state;
    const { id, isAccountSignIn } = this.props;

    return (
      <button
        className="btn-collect"
        onClick={() => {
          // this.props.handleLikeHeart(e);
          if (isAccountSignIn) {
            this.currentElemIsLiked();
            if (isLiked) {
            //   this.deleteFromMyCollectionOfLikes(id);
            } else if (!isLiked) {
            //   this.addToMyCollectionOfLikes();
            }
          } else if (!isAccountSignIn) {
            this.props.toggleAuthModalWindow(true);
          }
        }}
      >
            <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth="0"
          width="1.6em"
          height="1.3em"
          >
          <path
            d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            />
        </svg>
            Collect
      </button>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  identification: state.account.identification,
  isAccountSignIn: state.account.isAccountSignIn,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleLikeHeart: (e: React.MouseEvent<SVGSVGElement>) =>
      dispatch(handleLikeHeart(e)),
    toggleAuthModalWindow: (value: boolean) =>
      dispatch(toggleAuthModalWindow(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collect);
