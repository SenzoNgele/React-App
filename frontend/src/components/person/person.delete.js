import React, { Component } from "react";
import { Query } from "@apollo/react-components";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";

//-- User defined components
import { getAllPeople } from "./../../graphql/queries/person/person.query";

export default class Delete extends Component {
  render() {
    return (
      <div className="container" id="line">
        {/* ====================================================== display all people ==================================================================== */}
        <div className="table-responsive">
          <table className="table table-sm table-hover" id="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* ================================ query start ========================================== */}
              <Query query={getAllPeople}>
                {({ loading, data, error }) => {
                  if (loading) {
                    return (
                      <p>
                        &nbsp;
                        <Spinner color="primary" />
                        Loading, please wait...
                      </p>
                    );
                  }

                  if (error) {
                    console.log(error);
                  }

                  let i = 1;
                  var personsGrid = data.getAllPeople.map(item => (
                    <tr key={item._id}>
                      <td>{i++}</td>
                      <td>{item.name}</td>
                      <td>{item.surname}</td>
                      <td>{item.age}</td>
                      <td>
                        <Link
                          to={`personDelete/${item._id}`}
                          className="btn btn-success btn-sm "
                          id="delete_btn"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  ));

                  return personsGrid;
                }}
              </Query>
              {/* ================================= end of query========================================= */}
            </tbody>
          </table>
        </div>
        {/* ================================== End of get all people ======================================== */}
        <br />

        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item page-link">
              <Link to="#">Previous</Link>
            </li>
            <li className="page-item page-link">
              <Link to="#">1</Link>
            </li>
            <li className="page-item page-link">
              <Link to="#">2</Link>
            </li>
            <li className="page-item page-link">
              <Link to="#">3</Link>
            </li>
            <li className="page-item page-link">
              <Link to="#">Next</Link>
            </li>
          </ul>
        </nav>
        <br />
      </div>
    );
  }
}
