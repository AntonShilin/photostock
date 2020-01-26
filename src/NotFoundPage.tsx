import * as React from "react";

const NotFoundPage: React.SFC = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 text-center">
          <h4 className="text-danger">Sorry, 404 - The page cannot be found</h4>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
