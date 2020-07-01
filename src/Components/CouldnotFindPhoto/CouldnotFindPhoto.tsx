import * as React from "react";
import { NavLink } from "react-router-dom";
import "./CouldnotFindPhoto.scss";
import { IApplicationState } from "../../Store/Store";
import { connect } from "react-redux";
import { IDataSearch } from "../../Interfaces/Interfaces";

export interface INotFindPhotoProps {
  searchNamePhoto?: string;
  resultSearchImage?: IDataSearch | null;

}

export interface State {}

class CouldnotFindPhoto extends React.Component<INotFindPhotoProps, State> {
  public render() {
    return (
      <React.Fragment>
        {
        this.props.resultSearchImage?.photos?.length===0 ? (
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-5">
                We Couldn't Find Anything For "{this.props.searchNamePhoto}"
              </h2>
            </div>
            <div className="col-12">
              <p className="text-left">Try spelling the word correctly</p>
              <p className="text-left">
                Discover beautiful photos on{" "}
                <NavLink to="/photos">the main page »</NavLink>
              </p>
            </div>
          </div>
          ) :
          <div className="row mb-3">
            <div className="col-12">
              <h2 className="text-center">{this.props.searchNamePhoto} Images</h2>
            </div>
        </div>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    searchNamePhoto: state.products.searchNamePhoto,
  resultSearchImage: state.products.resultSearchImage
  };
};

export default connect(mapStateToProps, null)(CouldnotFindPhoto);
