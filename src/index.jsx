import { render } from "react-dom";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './components/app/app';
import rootReducer from './services/slices/index';
import './index.css';

const store = configureStore({ reducer: rootReducer });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);