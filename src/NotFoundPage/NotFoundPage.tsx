import * as React from "react";
import { NavLink } from "react-router-dom";
import { FaDizzy } from 'react-icons/fa';

const NotFoundPage: React.SFC = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h1 className="text-dark font-weight-bolder">Sorry!</h1>
          <h4 className="text-danger">
            We couldn't find your page. <br/>
            But we're working on it. <br/>
            Honest. 
          </h4>
          <h5 className="mb-5">
            <NavLink to={`/photos`} className="text-info">Go to the front page</NavLink>
          </h5>
          <span className="text-center">
            <FaDizzy  style={{ color: "yellow", fontSize: "10rem" }}/>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
