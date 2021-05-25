import * as React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../../Store/Store";
import LoadingPage from "../../../LoadingPage/LoadingPage";
import "./MyLikesTitleCollection.scss";

export interface Props {
  collection: any[] | null;
}

export interface State {}

class MyLikesTitleCollection extends React.Component<Props, State> {
  public render() {
    const { collection } = this.props;

    if (collection === null) {
      return <LoadingPage />;
    }

    return (
      collection !== null && (
        <div className="container-xl mylikes-collection-bg">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              {collection.map(
                (img, i) =>
                  i % 2 === 0 && <img src={img.src} alt="img" key={i} />
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              {collection.map(
                (img, k) =>
                  k % 2 !== 0 && <img src={img.src} alt="img" key={k} />
              )}
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  collection: state.account.collection,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyLikesTitleCollection);
