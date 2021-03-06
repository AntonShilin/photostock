import * as React from "react";
import { connect } from "react-redux";
import "./ButtonLike.scss";
import { IApplicationState } from "../../../Store/Store";
import firebase from "firebase";
import { toggleAuthModalWindow } from "../../../Actions/AccountActions";

export interface IButtonLikeProps {
  toggleAuthModalWindow: typeof toggleAuthModalWindow;
  id: number;
  src: string;
  photographer: string | null;
  videographer: string | null;
  isAccountSignIn: boolean;
  identification: string | undefined;
  liked: boolean;
}

export interface IButtonLikeState {
  isLiked: boolean;
}

class ButtonLike extends React.Component<IButtonLikeProps, IButtonLikeState> {
  constructor(props: IButtonLikeProps) {
    super(props);
    this.state = {
      isLiked: false,
    };
  }

  public componentDidMount() {
    const { liked } = this.props;
    this.setState({ isLiked: liked });
  }

  public addToMyCollectionOfLikes = () => {
    const { identification, id, src, photographer, videographer } = this.props;
    const db = firebase.firestore();
    if (identification !== undefined) {
      db.collection("all")
        .doc(identification)
        .collection("likes")
        .doc(id.toString())
        .set({
          id,
          src,
          photographer,
          videographer,
        })
        .then(() => {
          console.log("Add to likes collection successfully!");
        })
        .catch((error) => {
          console.error("Error adding to collection:", error);
        });
    }
  };

  public deleteFromMyCollectionOfLikes = (id: number) => {
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
        className={isLiked ? `btn-like btn-liked` : `btn-like`}
        onClick={() => {
          if (isAccountSignIn) {
            this.currentElemIsLiked();
            if (isLiked) {
              this.deleteFromMyCollectionOfLikes(id);
            } else if (!isLiked) {
              this.addToMyCollectionOfLikes();
            }
          } else if (!isAccountSignIn) {
            this.props.toggleAuthModalWindow(true);
          }
        }}
      >
        <svg
          className={isLiked ? `` : `svg-disliked`}
          viewBox="0 -2 35 35"
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="1.6em"
          height="1.3em"
        >
          <path
            d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
            c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
          />
        </svg>
        Like
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
    toggleAuthModalWindow: (value: boolean) =>
      dispatch(toggleAuthModalWindow(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLike);
