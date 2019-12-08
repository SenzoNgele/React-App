import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Link
// Redirect,
// withRouter
import Home from "./Home";
import Navigation from "./Navigation";
import Login from "../login/login";
import Create from "../person/person.create";
import Update from "../person/person.update";
import personUpdate from "../person/person.updateForm";
import Delete from "../person/person.delete";
import personDelete from "../person/person.deleteForm";
import NotFound from "./NotFound";

// protected route
//import { PrivateRoute } from "./PrivateRoutes";

const Protected = () => <h3>Public</h3>;

function Routes() {
  return (
    <Router>
      <div className="content">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Create" component={Create} />
          <Route exact path="/Update" component={Update} />
          <Route exact path="/personUpdate/:_id" component={personUpdate} />
          <Route exact path="/Delete" component={Delete} />
          <Route exact path="/personDelete/:_id" component={personDelete} />
          <Route component={NotFound} />
          <Route path="/protected" component={Protected} />
        </Switch>
      </div>
    </Router>
  );
}

export default Routes;
