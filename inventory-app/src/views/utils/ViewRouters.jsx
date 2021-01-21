import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Buttons from "../pages/Buttons";
import Customers from "../pages/Customers";
import Dashboard from "../pages/Dashboard";
import Error from "../pages/Error";
import Header from "../pages/Header";
import Home from "../pages/Home";
import Transactions from "../pages/Transactions";
import Storage from "../pages/Storage";

export default class ViewRouters extends Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <div className="px-2">
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/buttons" component={Buttons} />
            <Route path="/storage" component={Storage} />
            <Route path="/customers" component={Customers} />
            <Route exact path="/" component={Home} />
            <Route path="/error">
              <Error message="grave error" status="404" />
            </Route>
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
