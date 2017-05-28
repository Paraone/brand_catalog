import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import store, {history} from '../store';

//components
import Connector from './connector';
import Brands from './pages/Brands';
import Products from './pages/Products';
import About from './pages/About';

class RoutePaths extends Component{
  render(){
    return(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Connector}>
            <IndexRoute component={Brands}></IndexRoute>
            <Route path="/brands" component={Brands}></Route>
            <Route path="/products" component={Products}></Route>
            <Route path="/about" component={About}></Route>
            {/*
            Additional routes here. example:
            <Route path="/users" component={AllUsers}></Route>
            */}
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default RoutePaths;
