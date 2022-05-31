import { Route, Redirect, RouteProps } from "react-router-dom";
import { userSelector } from '../services/slices/authorization';
import { useSelector } from "../services/types/hooks-types";
import { FC, ReactNode } from "react";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isLoggedIn } = useSelector(userSelector);
 
  
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children as ReactNode
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
