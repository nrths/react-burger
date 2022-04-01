import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { fetchIngredients } from '../../services/thunks/ingredients-and-order-thunks';
import { getUserInfo } from '../../services/thunks/auth-thunks';

import AppHeader from "../app-header/app-header";
import {
  HomePage, LoginPage, RegistrationPage,
  ForgotPasswordPage, ResetPasswordPage, NotFoundPage,
  ProfilePage
} from '../../pages';
import { ProtectedRoute } from '../protected-route';

const App = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(fetchIngredients())
    dispatch(getUserInfo())
  }, [dispatch]);

  return (
    <>

      <AppHeader />

      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/register" exact={true}>
          <RegistrationPage />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

    </>
  )
};

export default App;
