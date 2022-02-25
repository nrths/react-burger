import { combineReducers } from 'redux';

import ingredientsReducer from './ingredients';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    //order: orderReducer,
})

export default rootReducer;