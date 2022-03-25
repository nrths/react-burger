import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fetchIngredients } from '../../services/thunks/ingredients-and-order-thunks';

import AppHeader from "../app-header/app-header";
import { HomePage, LoginPage, RegistrationPage, ForgotPasswordPage, ResetPasswordPage, NotFoundPage, ProfilePage } from '../../pages';

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch]);

  return (
    <>
      <Router>
        <AppHeader />

        <Switch>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>
          <Route path="/login" exact={true}>
            <LoginPage />
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
          <Route path="/profile" exact={true}>
            <ProfilePage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </>
  )
};

export default App;
