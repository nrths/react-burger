import { combineReducers } from 'redux';

import ingredientsReducer from '../slices/ingredients';
import authReducer from '../slices/authorization';
import wsReducer from '../slices/web-socket';
import feedReducer from '../slices/feed';

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    auth: authReducer,
    websocket: wsReducer,
    feed: feedReducer
})

export default rootReducer;