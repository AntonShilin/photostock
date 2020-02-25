import * as React from "react";
import { FiSearch } from "react-icons/fi";

export interface ISearchSmallProps {}

class SearchSmall extends React.Component<ISearchSmallProps> {
  public render() {
    return (
      <div className="ml-2 input-group input-group-md align-content-center d-lg-none">
        <form className="form-inline w-100 mr-5">
          <div className="input-group  w-100">
            <input
              type="text"
              className="form-control"
              placeholder="Find a photo"
              /*  value={this.props.searchNamePhoto}
          onChange={this.props.watchInputChange} */
              autoFocus={true}
            />
            <div className="input-group-append">
              <span
                className="input-group-text"
                /*  onClick={() => this.props.getNamePictureSearch(this.props)} */
              >
                <FiSearch />
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchSmall;
