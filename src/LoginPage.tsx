import * as React from "react";

const LoginPage: React.SFC = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Welcome Back To Photos & Video stock</h3>
        </div>
      </div>
      <div className="row mt-5 justify-content-center">
        <div className="col-md-7 col-sm-12">
          <form action="/action_page.php" className="bg-light p-3 rounded border">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                id="email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                id="pwd"
              />
            </div>
            <div className="form-group form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" /> Remember
                me
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
