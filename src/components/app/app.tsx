import { useEffect, FC } from "react";
import { useDispatch } from "../../services/types/hooks-types";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { fetchIngredients } from "../../services/thunks/ingredients-and-order-thunks";
import AppHeader from "../app-header/app-header";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderInfo from "../order-info/order-info";
import Modal from "../modal/modal";
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  ProfilePage,
  IngredientDetailsPage,
  FeedPage,
  OrderPage,
} from "../../pages";
import { ProtectedRoute } from "../protected-route";
import { TLocation } from "../../services/types/types";

const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCloseModal = () => {
    history.goBack();
  };

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

        <Route path="/feed" exact={true}>
          <FeedPage />
        </Route>

        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetailsPage />
        </Route>

        <Route path="/feed/:id" exact={true}>
          <OrderPage />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
        
      </Switch>

      {background && (
        <Switch>
          <Route path="/ingredients/:id" exact={true}>
            <Modal onClose={onCloseModal} title={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
          </Route>

          <Route path="/feed/:id" exact={true}>
            <Modal onClose={onCloseModal} title={""}>
              <OrderInfo />
            </Modal>
          </Route>

          <Route path="/profile/orders/:id" exact={true}>
            <Modal onClose={onCloseModal} title={""}>
              <OrderInfo />
            </Modal>
          </Route>
        </Switch>
      )}
    </>
  );
};

export default App;
