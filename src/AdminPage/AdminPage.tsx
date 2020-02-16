import * as React from "react";

class AdminPage extends React.Component {
  public render() {
    return (
      <div className="container mt-5">
        <h2 className="text-center">Profile</h2>
        <div className="card d-block mx-auto w-75">
          <div className="card-header">Login:</div>
          <div className="card-body">Email:</div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
