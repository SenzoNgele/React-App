import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";
//Link

//import Login from "../login/login";
import Create from "../person/person.create";
import Update from "../person/person.update";
import Delete from "../person/person.delete";
import LoginForm from "../login/login";

const auth = JSON.parse(localStorage.getItem("authorization"));

const token = auth ? auth : false;
const fakeAuth = {
  isAuthenticated: token ? true : false,

  authenticate(cb) {
    this.isAuthenticated = token ? true : false;
    setTimeout(cb, 100);
  }
};

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
    isAuthenticated: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: token ? true : false
      }));
    });
  };
  render() {
    // alert(fakeAuth.isAuthenticated);
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (redirectToReferrer === true) {
      return <Redirect to={from} />;
    }
    return (
      <div className="form-group row">
        <div className="col-sm-12">
          <p>you must login first at {from.pathname}</p>
          {/* <button className="btn btn-dark" onClick={this.login}>
            Sign in
          </button> */}
          <LoginForm />
        </div>
      </div>
    );
  }
}

// const logOut = withRouter(({ history }) =>
//   fakeAuth.isAuthenticated === true ? (
//     <p>
//       Welcome
//       <button
//         onClick={() => {
//           fakeAuth.signout(() => history.push("/"));
//         }}
//       >
//         Logout
//       </button>
//     </p>
//   ) : (
//     <p>Login to access app</p>
//   )
// );

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/Login", state: { from: props.location } }}
        />
      )
    }
  />
);

function Header() {
  return (
    <Router>
      <div className="content">
        <ul className="header">
          <li>
            <NavLink exact to="/" activeStyle={{ backgroundColor: "white" }}>
              USER CRUD
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Public"
              activeStyle={{ backgroundColor: "white" }}
            >
              Public
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Protected"
              activeStyle={{ backgroundColor: "white" }}
            >
              Protected
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Create"
              activeStyle={{ backgroundColor: "white" }}
            >
              Create
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Update"
              activeStyle={{ backgroundColor: "white" }}
            >
              Update
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/Delete"
              activeStyle={{ backgroundColor: "white" }}
            >
              Delete
            </NavLink>
          </li>
        </ul>
        <Switch>
          <Route exact path="/Public" component={Public} />
          <Route exact path="/Login" component={Login} />
          <PrivateRoute exact path="/Create" component={Create} />
          <PrivateRoute exact path="/Update" component={Update} />
          <PrivateRoute exact path="/Delete" component={Delete} />
          <PrivateRoute exact path="/Protected" component={Protected} />
        </Switch>
      </div>
    </Router>
  );
}

export default Header;
