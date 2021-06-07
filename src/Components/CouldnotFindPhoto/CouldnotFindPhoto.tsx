import * as React from "react";
import { NavLink } from "react-router-dom";
import "./CouldnotFindPhoto.scss";
import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";
import { IDataSearch } from "../../Interfaces/Interfaces";

export interface ICouldnotFindPhotoProps {
  searchNamePhoto: string;
  resultSearchImage: IDataSearch | null;
}

class CouldnotFindPhoto extends React.Component<ICouldnotFindPhotoProps, {}> {
  public render() {
    const { resultSearchImage, searchNamePhoto } = this.props;

    if (
      resultSearchImage !== undefined &&
      resultSearchImage !== null &&
      resultSearchImage.photos.length > 0
    ) {
      return (
        <div className="row find-photo-msg">
          <div className="col-12">
            <h2>{searchNamePhoto} Images</h2>
          </div>
        </div>
      );
    }

    if (resultSearchImage !== undefined && resultSearchImage === null) {
      return (
        <div className="row not-find-photo-msg">
          <div className="col-12">
            <h2>We Couldn't Find Anything For "{searchNamePhoto}"</h2>
          </div>
          <div className="col-12">
            <p>Try spelling the word correctly</p>
            <p>
              Discover beautiful photos on{" "}
              <NavLink to="/photos">the main page »</NavLink>
            </p>
          </div>
        </div>
      );
    }

    return (
      resultSearchImage !== undefined &&
      resultSearchImage !== null &&
      resultSearchImage.photos.length === 0 && (
        <div className="row not-find-photo-msg">
          <div className="col-12">
            <h2>We Couldn't Find Anything For "{searchNamePhoto}"</h2>
          </div>
          <div className="col-12">
            <p>Try spelling the word correctly</p>
            <p>
              Discover beautiful photos on{" "}
              <NavLink to="/photos">the main page »</NavLink>
            </p>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    searchNamePhoto: state.products.searchNamePhoto,
    resultSearchImage: state.products.resultSearchImage,
  };
};

export default connect(mapStateToProps, {})(CouldnotFindPhoto);
