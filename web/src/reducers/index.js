import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

// reducser imports here
import brands from './brands';
import single from './single';
import products from './products';

const rootReducer = combineReducers({brands, single, products, routing: routerReducer});

export default rootReducer;
