import * as React from 'react';
import { MdControlPoint } from 'react-icons/md';
import { connect } from 'react-redux';
import { downloadImage, getIdPhoto, getPopularImages, toggleWindowPhotoPage } from '../../Actions/ProductsActions';
import DownloadIcon from '../../Components/SVGIcons/DownloadIcon/DownloadIcon';
import Heart from '../../Components/SVGIcons/Heart/Heart';
import { ICuratedPhoto } from '../../Interfaces/Interfaces';
import { IApplicationState } from '../../Store/Store';
import "./TrendingPhotos.scss";


export interface ITrendingPhotosProps {
    data: ICuratedPhoto | null;
    getPopularImages: typeof getPopularImages;
    getIdPhoto: typeof getIdPhoto;
    toggleWindowPhotoPage: typeof toggleWindowPhotoPage;
    downloadImage: typeof downloadImage;
}
 
 
class TrendingPhotos extends React.Component<ITrendingPhotosProps, {}> {

    public componentDidMount() {
        const { data } = this.props;
        if (data === null) {
          this.props.getPopularImages();
        }
      }

    public render() {
        const { data } = this.props;
        
        return (
            <div className="container-xl trending_photos">
            <div className="row">
              <div className="col-12">
                <h6>Trending Free Stock Photos</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {data !== null &&
                    data.photos.map(
                      (image, i) =>
                        i % 2 !== 0 && (
                          <div key={i} className="col-12">
                            <div className="info-for-image">
                              <img
                                onClick={() => {
                                  this.props.getIdPhoto(image.id);
                                  this.props.toggleWindowPhotoPage();
                                }}
                                src={image.src.large}
                                alt={`img_${i}`}
                                crossOrigin="anonymous"
                              />
                              <div className="image-photographer">
                                <p>
                                  {image.photographer}
                                  {image.id}
                                </p>
                              </div>
                              <span>
                                <a
                                  download={true}
                                  onClick={(e) =>
                                    this.props.downloadImage(e.currentTarget)
                                  }
                                >
                                  <DownloadIcon />
                                </a>
                              </span>
                              <span>
                                <MdControlPoint />
                              </span>
                              <span>
                                <Heart
                                  id={image.id}
                                  src={image.src.large}
                                  photographer={image.photographer}
                                  videographer={null}
                                  liked={false}
                                  poster={null}
                                />
                              </span>
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="row">
                  {data !== null &&
                    data.photos.map(
                      (image, i) =>
                        i % 2 === 0 && (
                          <div key={i} className="col-12">
                            <div className="info-for-image">
                              <img
                                src={image.src.large}
                                alt={`img_${i}`}
                                crossOrigin="anonymous"
                                onClick={() => {
                                  this.props.getIdPhoto(image.id);
                                  this.props.toggleWindowPhotoPage();
                                }}
                              />
                              <div className="image-photographer">
                                <p>{image.photographer}</p>
                              </div>
                              <span>
                                <a
                                  download={true}
                                  onClick={(e) =>
                                    this.props.downloadImage(e.currentTarget)
                                  }
                                >
                                  <DownloadIcon />
                                </a>
                              </span>
                              <span>
                                <MdControlPoint />
                              </span>
                              <span>
                                <Heart
                                  id={image.id}
                                  src={image.src.large}
                                  photographer={image.photographer}
                                  videographer={null}
                                  liked={false}
                                  poster={null}
                                />
                              </span>
                            </div>
                          </div>
                        )
                    )}
                </div>
              </div>
            </div>
          </div>

         );
    }
}
 
const mapStateToProps = (state: IApplicationState) => ({
    data: state.products.data,
    isLoadingPopularImages: state.products.isLoadingPopularImages
  });
  
  const mapDispatchToProps = (dispatch: any) => {
    return {
      getPopularImages: () => dispatch(getPopularImages()),
      downloadImage: (elem: any) => dispatch(downloadImage(elem)),
      getIdPhoto: (id: number) => dispatch(getIdPhoto(id)),
      toggleWindowPhotoPage: () => dispatch(toggleWindowPhotoPage()),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(TrendingPhotos);