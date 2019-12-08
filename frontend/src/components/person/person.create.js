import React, { Component } from "react";
import { Query, Mutation } from "@apollo/react-components";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import Joi from "@hapi/joi";
//import { Multiselect } from "react-widgets";
//import Select from 'react-select';

//-- User defined components
import {
  createPersons,
  getAllPeople
  //getPersonById
} from "./../../graphql/queries/person/person.query";
import {
  getAllHobbies
  //getHobbyById
} from "./../../graphql/queries/hobbies/hobbies.query";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      Surname: "",
      age: "",
      gender: "",
      hobbies: [],
      address1: "",
      address2: "",
      address3: ""
    };
  }

  formJoiValidation() {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .min(3)
        .max(80)
        .error(error => {
          return new Error("Invalid input or empty");
        }),
      surname: Joi.string()
        .required()
        .min(3)
        .max(80),
      age: Joi.number()
        .required()
        .max(120),
      gender: Joi.required(),
      hobbies: Joi.required(),
      address1: Joi.string()
        .min(3)
        .max(80)
        .required(),
      address2: Joi.string()
        .required()
        .min(3)
        .max(80),
      address3: Joi.string()
        .required()
        .min(3)
        .max(80)
    });

    const { error } = schema.validate({
      name: this.state.name,
      surname: this.state.surname,
      age: this.state.age,
      gender: this.state.gender,
      address1: this.state.address1,
      address2: this.state.address2,
      address3: this.state.address3,
      hobbies: this.state.hobbies
    });

    if (error) {
      alert(error);
      return false;
    }
    return true;
  }

  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    return (
      <div className="container" id="line">
        <Mutation mutation={createPersons}>
          {createPersons => (
            <form
              className="form-horizontal"
              onSubmit={e => {
                e.preventDefault();

                if (this.formJoiValidation()) {
                  createPersons({
                    variables: this.state
                  });

                  this.setState({
                    name: "",
                    surname: "",
                    age: "",
                    gender: "",
                    address1: "",
                    address2: "",
                    address3: "",
                    hobbies: ""
                  });
                }
              }}
            >
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-1 col-form-label-sm">
                  Name
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="name"
                    value={this.state.name}
                    onChange={e => {
                      this.setState({ name: e.target.value });
                    }}
                    placeholder="Enter name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="surname" className="col-sm-1 col-form-label-sm">
                  Surname
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="surname"
                    value={this.state.surname}
                    onChange={e => {
                      this.setState({ surname: e.target.value });
                    }}
                    placeholder="Enter surname"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="age" className="col-sm-1 col-form-label-sm">
                  Age
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="age"
                    value={this.state.age}
                    onChange={e => {
                      this.setState({ age: Number(e.target.value) });
                    }}
                    placeholder="Enter age"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="gender" className="col-sm-1 col-form-label-sm">
                  Gender
                </label>
                &nbsp;&nbsp;&nbsp;
                <div className="form-check form-check-inline">
                  <label className="form-check-label">Male </label>
                  <div className="col-sm-4">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      value="Male"
                      checked={this.state.gender === "Male"}
                      onChange={e => {
                        this.setState({ gender: e.target.value });
                      }}
                    />
                  </div>
                  <label className="form-check-label">Female </label>
                  <div className="col-sm-4">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      value="Female"
                      checked={this.state.gender === "Female"}
                      onChange={e => {
                        this.setState({ gender: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="hobby" className="col-sm-1 col-form-label-sm">
                  Hobby:
                </label>
                <div className="col-sm-4">
                  {/* ================================ query start ========================================== */}
                  <Query query={getAllHobbies}>
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

                      return (
                        <select
                          className="form-control form-control-sm"
                          name="hobbies"
                          multiple="multiple"
                          onChange={e => {
                            this.setState({ hobbies: [e.target.value] });
                          }}
                        >
                          <option value="none" selected>
                            Select Hobby...
                          </option>
                          {data.getAllHobbies.map(item => (
                            <option key={item._id} value={item._id}>
                              {item.description}
                            </option>
                          ))}
                        </select>
                      );
                    }}
                  </Query>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="address1"
                  className="col-sm-1 col-form-label-sm"
                >
                  Address:
                </label>
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="address1"
                    value={this.state.address1}
                    onChange={e => {
                      this.setState({ address1: e.target.value });
                    }}
                    placeholder="Enter address"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="address2"
                  className="col-sm-1 col-form-label-sm"
                />
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="address2"
                    value={this.state.address2}
                    onChange={e => {
                      this.setState({ address2: e.target.value });
                    }}
                    placeholder="Enter address"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="addres3"
                  className="col-sm-1 col-form-label-sm"
                />
                <div className="col-sm-4">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    name="address3"
                    value={this.state.address3}
                    onChange={e => {
                      this.setState({ address3: e.target.value });
                    }}
                    placeholder="Enter address"
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={this.refreshPage}
                  >
                    Save
                  </button>{" "}
                  &nbsp;&nbsp;&nbsp;
                  <button type="reset" className="btn btn-primary">
                    Clear
                  </button>
                </div>
              </div>
              <br />
            </form>
          )}
        </Mutation>

        {/* ====================================================== display all people ==================================================================== */}
        <div className="table-responsive">
          <table className="table table-sm table-hover" id="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Address L1</th>
                <th>Address L2</th>
                <th>Address L3</th>
                <th>Hobby</th>
              </tr>
            </thead>
            <tbody>
              {/* ================================ query start ========================================== */}
              <Query query={getAllPeople}>
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
                  var personsGrid = data.getAllPeople.map(item => {
                    let hobby = [];
                    hobby.push(item.hobbies.map(hobb => hobb.description));
                    console.log(hobby.toString());
                    return (
                      <tr key={item._id}>
                        <td>{i++}</td>
                        <td>{item.name}</td>
                        <td>{item.surname}</td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>{item.address.address1}</td>
                        <td>{item.address.address2}</td>
                        <td>{item.address.address3}</td>
                        <td>{hobby.toString()}</td>
                      </tr>
                    );
                  });

                  return personsGrid;
                }}
              </Query>
              {/* ================================= end of query========================================= */}
            </tbody>
          </table>
        </div>
        {/* ================================== End of get all people ======================================== */}
        <br />

        <navbar aria-label="Page navigation responsive">
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
        </navbar>
        <br />
      </div>
    );
  }
}
