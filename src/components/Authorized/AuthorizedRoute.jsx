import { Navigate, Route } from 'react-router-dom';
import React from 'react';
import Authorized from './Authorized';

const AuthorizedRoute = ({ component: Component, render, authority, redirectPath, ...rest }) => (
  <Authorized
    authority={authority}
    noMatch={
      <Route
        {...rest}
        element={
          <Navigate
            to={{
              pathname: redirectPath,
            }}
          />
        }
      />
    }
  >
    <Route {...rest} element={Component ? <Component /> : render()} />
  </Authorized>
);

export default AuthorizedRoute;