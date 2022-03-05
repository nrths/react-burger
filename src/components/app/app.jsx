import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ingredientsSelector } from '../../services/slices/ingredients';
import { fetchIngredients } from '../../services/thunks/thunk-requests';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loader from "../loader/loader";
import Error from '../error/error';

const App = () => {

  const { loading, hasError } = useSelector(ingredientsSelector);
  const dispatch = useDispatch()
  // console.log('ingr:', ingredients)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, [dispatch]);

  const renderIngredients = () => {
    if (loading) return <Loader />
    if (hasError) return <Error />

    return <>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </>
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {renderIngredients()}
      </main>
    </>
  )
};

export default App;
