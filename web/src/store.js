import {createStore} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from './reducers/index';

const defaultState = {
  brands : {
    loading: true,
    allBrands: []
  },
  single : {
    loading: true,
    products: [],
    brand: null
  },
  products : {
    loading : true,
    allProducts: []
  }
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
