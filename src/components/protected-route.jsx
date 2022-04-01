/* eslint-disable no-unused-expressions */
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, ...rest }) => {
    const { isLoggedIn } = useSelector(state => state.auth)
    
    return (
        <Route
          {...rest}
          render={({ location }) =>
            isLoggedIn ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            )
          }
        />
      );
}