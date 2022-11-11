import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginPage from "../Pages/Auth/LoginPage";
import DashboardRoutes from "./Dashboard/DashboardRoutes";

import { LoginUser, checkUserAuthentication } from "../api/Auth";

const Routes = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const checkLogin = async () => {
    setAuthenticated(await checkUserAuthentication());
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          path="/"
          component={
            authenticated
              ? DashboardRoutes
              : () => <LoginPage setAuthenticated={setAuthenticated} />
          }
        />
      </Switch>
    </Router>
  );
};

export default Routes;
