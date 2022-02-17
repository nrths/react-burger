import React, { useState, useEffect, useReducer } from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loader from "../loader/loader";
import Error from '../error/error';
import { baseUrl, checkResponse } from "../../utils/data";
import { BurgerConstructorContext } from '../../services/burger-constructor-context';

const initialIngredients = {
  data: [],
  total: 0,
}

const reducer = (state, action) => {
  let total = 0;
  const ingredients = state.data;

  if (ingredients.length > 0) {
    total = (ingredients.filter(ingredient => ingredient.type !== 'bun').reduce((prev, item) => prev + item.price, 0)) + (ingredients.find(ingredient => ingredient.type === 'bun').price * 2);
  }

  switch (action.type) {
    case 'data': 
      return {...state, data: action.payload}
    case 'total': 
      return {...state, total: total}
    default:
      throw new Error('Something wrong!');
  }
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialIngredients, undefined);
  const [appInitialState, setAppInitialState] = useState({
    loading: true,
    hasError: false,
  });

  

  useEffect(() => {

    const getIngredients = () => {
      fetch(`${baseUrl}/ingredients`)
        .then(checkResponse)
        .then((res) => {
          dispatch({type: 'data', payload: res.data})
          setAppInitialState({ ...appInitialState, loading: false });
          console.log(res)
        })
        .catch((error) => {
          dispatch({type: 'data', payload: []})
          setAppInitialState({ ...appInitialState, hasError: true });
          console.log(error);
        })
        .finally(() => {
          setAppInitialState({ ...appInitialState, loading: false });
        })
    }

    getIngredients();
  }, []);


  if (appInitialState.loading === true) {
    return (
      <>
        <Loader />
      </>
    )
  } else {
    if (appInitialState.hasError === false) {
      return (
        <>
          <AppHeader />
          <main className={styles.main}>
            <BurgerConstructorContext.Provider value={{ state, dispatch }}>
              <BurgerIngredients />
              <BurgerConstructor />
            </BurgerConstructorContext.Provider>
          </main>
        </>
      )
    } else {
      return (
        <>
          <Error />
        </>
      )
    }
  }
};

export default App;
