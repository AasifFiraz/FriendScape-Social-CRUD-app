import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/auth";

const AuthRoute = ({ children, ...rest }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }
  return <Route {...rest} render={() => children} />;
};

export default AuthRoute;
