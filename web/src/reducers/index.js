import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// reducser imports here
import brands from './brands';

const rootReducer = combineReducers({brands, routing: routerReducer});

export default rootReducer;
