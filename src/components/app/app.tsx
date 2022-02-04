import React, { useState, useEffect } from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { baseUrl, checkResponse } from "../../utils/data";

const App = () => {

  const [state, setState] = useState({
    data: [],
    loading: true,
    hasError: false,
  });

  const getIngredients = () => {
    fetch(`${baseUrl}`)
    .then(checkResponse)
    .then((res) => {
      setState({...state, data: res.data});
      console.log(res)})
    .catch((error) => {
      setState({...state, loading: false, hasError: true});
      console.log(error);
    })}
    
    useEffect(() => {
      getIngredients();
    }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={state.data} />
        <BurgerConstructor data={state.data} />
      </main>
    </>
  );
};

export default App;
