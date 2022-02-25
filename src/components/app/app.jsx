import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ingredientsSelector, fetchIngredients } from '../../slices/ingredients';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loader from "../loader/loader";
import Error from '../error/error';

const App = () => {

  const { ingredients, loading, hasError } = useSelector(ingredientsSelector);
  const dispatch = useDispatch()
  console.log('ingr:', ingredients)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch]);

  const renderIngredients = () => {
    if (loading) return <Loader />
    if (hasError) return <Error />

    return <>
      <BurgerIngredients />
      {/* <BurgerConstructor /> */}
    </>
  }

      return (
        <>
          <AppHeader />
          <main className={styles.main}>
            {renderIngredients()}
            {/* <BurgerConstructorContext.Provider value={{ state, dispatch }}>
              <BurgerIngredients />
              <BurgerConstructor />
            </BurgerConstructorContext.Provider> */}
          </main>
        </>
      )
};

export default App;
