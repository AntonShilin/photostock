import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../../../Store/Store";

export interface ITotalMyLikesProps {
  collection: any[] | null;
}

export interface ITotalMyLikesState {}

class TotalMyLikes extends React.Component<
  ITotalMyLikesProps,
  ITotalMyLikesState
> {
  public render() {
    const { collection } = this.props;

    if (collection !== null) {
      const totalLikesPhotos = collection.filter((obj: { photographer: any }) => {
        return obj.photographer !== null;
      });

      const totalLikesVideos = collection.filter((obj: { videographer: any }) => {
        return obj.videographer !== null;
      });

      if (totalLikesPhotos.length > 0 && totalLikesVideos.length > 0) {
        return `
            ${totalLikesPhotos.length} photo and ${totalLikesVideos.length} video liked by
            `;
      } else if (totalLikesPhotos.length > 0 && totalLikesVideos.length === 0) {
        return `
            ${totalLikesPhotos.length} photo liked by
            `;
      } else if (totalLikesPhotos.length === 0 && totalLikesVideos.length > 0) {
        return `
            ${totalLikesVideos.length} video liked by
            `;
      }
    }

    return null;
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  collection: state.account.collection,
});

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps,mapDispatchToProps)(TotalMyLikes);
