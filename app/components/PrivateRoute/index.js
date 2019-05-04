/**
 *
 * PrivateRoute
 *
 */

import React, { memo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ls from 'local-storage';
import { USER_TOKEN } from '../../constants/local_storage_constants';

/* eslint-disable */
function PrivateRoute(props){
 function renderComponentOrRedirect(props){
    if (ls.get(USER_TOKEN)) {
      const { component: Component } = props;
      return <Component {...props} />;
    }
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location },
        }}
      />
    );
  }
    const { component, ...rest } = props;
    return (
      <Route
        {...rest}
        render={props => renderComponentOrRedirect(props)}
      />
    );
}

export default memo(PrivateRoute);
