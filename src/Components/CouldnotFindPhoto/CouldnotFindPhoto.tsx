import * as React from "react";
import { NavLink } from "react-router-dom";
import "./CouldnotFindPhoto.scss";
import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";
import { IDataSearch } from "../../Interfaces/Interfaces";

export interface INotFindPhotoProps {
  searchNamePhoto: string;
  resultSearchImage: IDataSearch | null;
}

export interface State {}

class CouldnotFindPhoto extends React.Component<INotFindPhotoProps, State> {
  public render() {
    const { resultSearchImage, searchNamePhoto } = this.props;

    return (
      <>
        {resultSearchImage !== null && resultSearchImage.photos.length === 0 ? (
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
        ) : (
          <div className="row find-photo-msg">
            <div className="col-12">
              <h2>{searchNamePhoto} Images</h2>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    searchNamePhoto: state.products.searchNamePhoto,
    resultSearchImage: state.products.resultSearchImage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CouldnotFindPhoto);
