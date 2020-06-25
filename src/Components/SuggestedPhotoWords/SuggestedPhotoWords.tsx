import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../Store/Store";
import {
  getSearchVideos,
  getSearchImages,
  searchBySuggestedWord,
} from "../../Actions/ProductsActions";
import "./SuggestedPhotoWords.scss";
import { NavLink } from "react-router-dom";

export interface ISuggestedImagesProps {
  suggestedWords: string[];
  getSearchImages: typeof getSearchImages;
  getSearchVideos: typeof getSearchVideos;
  searchBySuggestedWord: typeof searchBySuggestedWord;
}

export interface State {}

class SuggestedPhotoWords extends React.Component<ISuggestedImagesProps, State> {
  public render() {
    return (
      <div className="suggested_photo_words">
        Suggested:
        {this.props.suggestedWords.map((word, i) => (
          <NavLink
            to={`/photos/${word}`}
            key={i}
            className="ml-2"
            onClick={(e) => {
              this.props.getSearchImages(e.currentTarget.textContent!);
              this.props.getSearchVideos(e.currentTarget.textContent!);
              this.props.searchBySuggestedWord(word);
            }}
          >
            {word}
          </NavLink>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  suggestedWords: state.products.suggestedWords,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getSearchVideos: (name: string) => dispatch(getSearchVideos(name)),
    getSearchImages: (name: string) => dispatch(getSearchImages(name)),
    searchBySuggestedWord: (value: string) => dispatch(searchBySuggestedWord(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedPhotoWords);
