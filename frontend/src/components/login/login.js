import React, { Component } from "react";
import { Mutation } from "@apollo/react-components";
import Joi from "@hapi/joi";
//Query,
import { login } from "./../../graphql/queries/user/user.query";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      email: "",
      password: ""
    };
  }

  formValidation() {
    const schema = Joi.object({
      email: Joi.string()
        .required()
        .min(3)
        .max(80)
        .error(error => {
          return new Error("Invalid username!");
        }),
      password: Joi.string()
        .required()
        .min(4)
        .max(10)
        .error(error => {
          return new Error("password is Invalid!");
        })
    });

    const { error } = schema.validate({
      email: this.state.email,
      password: this.state.password
    });

    if (error) {
      alert(error);
      return false;
    }
    return true;
  }

  render() {
    return (
      <div
        className="d-flex justify-content-center align-items-left container"
        id="line"
      >
        <div className="row ">
          <Mutation mutation={login}>
            {login => (
              <form
                className="horizontal-form"
                onSubmit={async e => {
                  e.preventDefault();
                  // if (this.state.login) {
                  if (this.formValidation()) {
                    const userLogin = await login({
                      variables: this.state
                    });
                    console.log(userLogin.data.login);
                    localStorage.setItem(
                      "authorization",
                      JSON.stringify(userLogin.data.login)
                    );
                    this.setState({ email: "", password: "" });
                  }
                  // }
                }}
              >
                <fieldset>
                  <div className="form-group row">
                    <label
                      htmlFor="email"
                      className="col-sm-4  col-form-label-sm"
                    >
                      Email
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={e => {
                          this.setState({ email: e.target.value });
                        }}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="password"
                      className="col-sm-4 col-form-label-sm"
                    >
                      Password
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="password"
                        className="form-control form-control-sm"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={e => {
                          this.setState({ password: e.target.value });
                        }}
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  {/* <div className="form-group row">
               <label htmlFor="role" className="col-sm-4 col-form-label-sm">
                 Role:
               </label>
               <div className="col-sm-8">
                 <select
                   className="form-control form-control-sm"
                   id="input"
                   name="role"
                 >
                   <option>Role ...</option>
                   <option>Admin</option>
                   <option>User</option>
                 </select>
               </div>
             </div> */}
                  <div className="form-group row">
                    <div className="col-sm-12">
                      <button
                        type="submit"
                        className="btn btn-dark"
                        id="button"
                        onClick={this.handleSubmit}
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </fieldset>
              </form>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}
