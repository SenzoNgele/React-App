import React, { Component } from "react";
import { Query, Mutation } from "@apollo/react-components";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";

//-- User defined components
import {
  getAllHobbies,
  getHobbyById
} from "./../../graphql/queries/hobbies/hobbies.query";

export default class Create extends Component {
  render() {
    return (
      <div className="container">
        {/* ====================================================== display all Hobbies ==================================================================== */}
        <table
          className="table table-condensed table-sm table-hover"
          id="table"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {/* ================================ query start ========================================== */}
            <Query query={getAllHobbies}>
              {({ loading, data, error }) => {
                if (loading) {
                  return (
                    <p>
                      <Spinner size="sm" color="primary" />
                      Data still loading, please wait...
                    </p>
                  );
                }

                if (error) {
                  console.log(error);
                }

                let i = 1;
                var hobbiesGrid = data.getAllHobbies.map(item => (
                  <tr key={item._id}>
                    <td>{i++}</td>
                    <td>{item.description}</td>
                  </tr>
                ));

                return hobbiesGrid;
              }}
            </Query>
            {/* ================================= end of query========================================= */}
          </tbody>
        </table>
        {/* ================================== End of get all people ======================================== */}
        <br />
      </div>
    );
  }
}
