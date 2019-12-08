import React, { Component } from "react";
import { Query, Mutation } from "@apollo/react-components";
import { Link } from "react-router-dom";

//-- User defined components
import {
  getPersonById,
  updatePerson
} from "./../../graphql/queries/person/person.query";

//-- User defined components
import { getAllHobbies } from "./../../graphql/queries/hobbies/hobbies.query";

export default class personUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personId: "",
      name: "",
      surname: "",
      age: "",
      gender: "",
      hobbies: "",
      address1: "",
      address2: "",
      address3: "",
      isDeleted: false,
      isActive: true
    };
  }

  confirmUpdate = () => {
    var response = window.confirm(
      `Updating ${this.state.name} - ${this.state.surname} ?`
    );
    if (response === true) window.location = "/Update";
    else return false;
  };

  render() {
    return (
      <div className="container" id="line">
        <Query
          query={getPersonById}
          variables={{ personId: this.props.match.params._id }}
          onCompleted={data => {
            this.setState({
              name: data.getPersonById.name,
              surname: data.getPersonById.surname,
              age: data.getPersonById.age,
              gender: data.getPersonById.gender,
              address1: data.getPersonById.address.address1,
              address2: data.getPersonById.address.address2,
              address3: data.getPersonById.address.address3,
              isDeleted: data.getPersonById.isDeleted,
              isActive: data.getPersonById.isActive,
              hobbies: data.getPersonById.hobbies.map(hobbyId => hobbyId._id),
              hobbyDesc: data.getPersonById.hobbies.map(
                hobbyDesc => hobbyDesc.description
              )
            });
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return console.log(error);

            return (
              <Mutation mutation={updatePerson} key={this.state.personId}>
                {(updatePerson, { loading, error }) => (
                  <form
                    className="form-horizontal"
                    onSubmit={e => {
                      e.preventDefault();

                      updatePerson({
                        variables: {
                          personId: this.props.match.params._id,
                          name: this.state.name,
                          surname: this.state.surname,
                          age: this.state.age,
                          gender: this.state.gender,
                          hobbies: this.state.hobbies,
                          address1: this.state.address1,
                          address2: this.state.address2,
                          address3: this.state.address3,
                          isDeleted: this.state.isDeleted,
                          isActive: this.state.isActive
                        }
                      });
                    }}
                  >
                    <div className="form-group row">
                      <label
                        htmlFor="name"
                        className="col-sm-1 col-form-label-sm"
                      >
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
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="surname"
                        className="col-sm-1 col-form-label-sm"
                      >
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
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="age"
                        className="col-sm-1 col-form-label-sm"
                      >
                        Age
                      </label>
                      <div className="col-sm-4">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          name="age"
                          value={this.state.age}
                          onChange={e => {
                            this.setState({ age: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="gender"
                        className="col-sm-1 col-form-label-sm"
                      >
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
                      <label
                        htmlFor="hobby"
                        className="col-sm-1 col-form-label-sm"
                      >
                        Hobby:
                      </label>
                      <div className="col-sm-4">
                        <Query query={getAllHobbies}>
                          {({ loading, data, error }) => {
                            if (loading) return "Loading...";
                            if (error) return console.log(error);

                            return (
                              <select
                                className="form-control form-control-sm"
                                name="hobbies"
                                onChange={e => {
                                  this.setState({ hobbies: e.target.value });
                                }}
                                multiple="multiple"
                              >
                                <option value={this.state.hobbies} selected>
                                  {this.state.hobbyDesc + "  "}
                                </option>
                                {data.getAllHobbies.map(item => (
                                  <option
                                    key={item._id}
                                    value={item._id}
                                    // selected={
                                    //   hobbies.filter(
                                    //     _ => _._id === item._id
                                    //   ).length > 0
                                    //     ? "selected"
                                    //     : ""
                                    // }
                                  >
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
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 col-sm-10">
                        <button
                          type="submit"
                          className="btn btn-success"
                          onClick={this.confirmUpdate}
                        >
                          Update
                        </button>
                        &nbsp;&nbsp;&nbsp;
                        <Link to={"/Update"} className="btn btn-primary">
                          GoBack
                        </Link>
                      </div>
                    </div>
                    <br />
                  </form>
                )}
              </Mutation>
            );
          }}
        </Query>
      </div>
    );
  }
}
