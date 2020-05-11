import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import "url-search-params-polyfill";
import { connect } from "react-redux";
import { IApplicationState } from "../Store/Store";
import {
  getData,
  handleSearchKeydown,
  stickInputToTheTop,
} from "../Actions/ProductsActions";
import { handleSearchChange } from "../Actions/ProductsActions";
import { goToResultPageSearchPictureName } from "../Actions/ProductsActions";
import { ICuratedPhoto } from "../ProductsData/ProductsData";
import "./PhotosPage.scss";
import LoadingPage from "../LoadingPage/LoadingPage";
import { FiSearch } from "react-icons/fi";
import NavigationPages from "../NavigationPages/NavigationPages";

export interface IProps extends RouteComponentProps {
  data: ICuratedPhoto | null;
  getDataForMainPage: typeof getData;
  searchNamePhoto: string;
  watchInputChange: typeof handleSearchChange;
  goToResultPage: typeof goToResultPageSearchPictureName;
  getKeyNumber: typeof handleSearchKeydown;
  stickInputToTheTop: typeof stickInputToTheTop;
  isScrollTop: number | null;
  isScrollHeight: number | null;
  isClientHeight: number | null;
  isScrolling: boolean;
}

class PhotosPage extends React.Component<IProps> {
  public searchArea: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);
    this.searchArea = React.createRef();
  }

  public componentDidMount() {
    if (this.props.data === null) {
      this.props.getDataForMainPage();
    }
   /*  
      window.addEventListener("scroll", (e) => {
        const scrollTop: number = this.props.isScrollTop!;
      
        if (scrollTop > 400 ) {
          if (this.searchArea.current!) {
            this.props.stickInputToTheTop(this.searchArea.current);
            e.stopPropagation();
          } 
        }
      }, false); */
   
  }

  public render() {
    return (
      <React.Fragment>
        <div className="container-xl bg-light photospage_bg">
          <h1 className="pb-5 text-white">
            The best free stock photos from talented authors.
          </h1>
          <div
            className="input-group mb-3 input-group-lg"
            ref={this.searchArea}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Find a photo"
              value={this.props.searchNamePhoto}
              onChange={this.props.watchInputChange}
              autoFocus={false}
              /* onKeyDown={this.props.getKeyNumber} */
            />
            <div className="input-group-append">
              <span
                className="input-group-text"
                onClick={() => this.props.goToResultPage(this.props)}
              >
                <FiSearch />
              </span>
            </div>
          </div>
          <h6>
            Search ideas:{" "}
            <span className="text-white">
              car, adventure, crowd, dark, workout, butterfly, more...
            </span>
          </h6>
        </div>
        <NavigationPages/>
        <div className="container-xl bg-light">
          <div className="row mb-2">
            <div className="col-12">
              <h6 className="m-0 mt-2">Free Stock Photos Trending </h6>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="d-flex flex-wrap justify-content-center">
                {this.props.data === null ? (
                  <LoadingPage />
                ) : (
                  this.props.data.photos.map((elem, i) => (
                    <div key={i} className="p-2">
                      <div className="info-for-image">
                        <img
                          src={elem.src.medium}
                          className="img-fluid"
                          alt="img_1"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => ({
  data: store.products.data,
  isScrollTop: store.products.isScrollTop,
  isScrollHeight: store.products.isScrollHeight,
  isClientHeight: store.products.isClientHeight,
  isScrolling: store.products.isScrolling
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getKeyNumber: (e: any) => dispatch(handleSearchKeydown(e)),
    getDataForMainPage: () => dispatch(getData()),
    watchInputChange: (e: string) => dispatch(handleSearchChange(e)),
    stickInputToTheTop: (elem: HTMLDivElement) =>
      dispatch(stickInputToTheTop(elem)),
    goToResultPage: (allprops: IProps) =>
      dispatch(goToResultPageSearchPictureName(allprops)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotosPage);
