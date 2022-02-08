import React, { useState, useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Loader from "../loader/loader";
import Error from '../error/error';
import { baseUrl, checkResponse } from "../../utils/data";

const App = () => {

  const [state, setState] = useState({
    data: [],
    loading: true,
    hasError: false,
  });
  
  const getIngredients = () => {
    fetch(`${baseUrl}/ingredients`)
      .then(checkResponse)
      .then((res) => {
        setState({ ...state, loading: false, data: res.data });
        console.log(res)
      })
      .catch((error) => {
        setState({ ...state, loading: false, hasError: true });
        console.log(error);
      })
  }

  useEffect(() => {
    getIngredients();
  }, []);


  if (state.loading === true) {
    return (
      <>
        <Loader />
      </>
    )
  } else {
    if (state.hasError === false) {
      return (
        <>
          <AppHeader />
          <main className={styles.main}>
            <BurgerIngredients data={state.data} />
            <BurgerConstructor data={state.data} />
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
