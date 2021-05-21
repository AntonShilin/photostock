import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../Store/Store";
import "./Collections.scss";

export interface ICollectionsProps {
  collection: any[] | null;
}

export interface State {}

class Collections extends React.Component<ICollectionsProps, State> {
  public render() {
    const { collection } = this.props;
    console.log(collection);
    return (
      <div className="container-xl collection_main">
        <div className="row title">
          <div className="col">
            <span>Collections</span>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {collection !== null && (
              <div className="collection_likes">
                <div className="collection_title">
                  <img
                    className="collection_title_img"
                    src={collection.length > 0 ? collection![0].src : ""}
                    alt="img"
                  />
                </div>
                <div className="collection_rest">
                  {collection!.map(
                    (img, i) => i > 0 && <img src={img.src} alt="img" key={i} />
                  )}
                </div>
                <div className="collection_size">
                  <div>Your likes</div>
                  <div> {collection.length}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  collection: state.account.collection,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Collections);
