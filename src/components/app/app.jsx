import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { fetchIngredients } from '../../services/thunks/ingredients-and-order-thunks';
import { checkPreLogin } from '../../services/slices/authorization';

import AppHeader from "../app-header/app-header";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from "../modal/modal";
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
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients())
    dispatch(checkPreLogin())
  }, [dispatch]);

  const onCloseModal = () => {
    history.goBack();
  }

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
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/login" exact={true}>
          <LoginPage />
        </Route>

        <Route path='/ingredients/:id' exact={true}>
          <IngredientDetails />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>

      {background &&
          <Route path='/ingredients/:id' >
            <Modal onClose={onCloseModal} title={'Детали ингредиента'}>
              <IngredientDetails/>
            </Modal>
          </Route>
        }

    </>
  )
};

export default App;
