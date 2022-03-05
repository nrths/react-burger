import { combineReducers } from 'redux';

import ingredientsReducer from './ingredients';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
})

export default rootReducer;