import * as React from "react";

class AdminPage extends React.Component {
  public render() {
    return (
      <div className="container mt-5">
        <h2>Profile</h2>
        <div className="card">
          <div className="card-header">Name:</div>
          <div className="card-body">Login:</div>
          <div className="card-footer">Email:</div>
        </div>
      </div>
    );
  }
}

export default AdminPage;
