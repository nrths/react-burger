import { render } from "react-dom";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app/app';
import rootReducer from './services/reducers/index';
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import './index.css';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketMiddleware()) // передвавать слайс как аргумент?
});

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);