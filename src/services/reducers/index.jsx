import { combineReducers } from 'redux';

import ingredientsReducer from '../slices/ingredients';
import authReducer from '../slices/authorization';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    auth: authReducer, 
})

export default rootReducer;