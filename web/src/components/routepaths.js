import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import store, {history} from '../store';

//components
import Connector from './connector';
import Brands from './pages/Brands';
import SingleBrand from './pages/SingleBrand';
import NewBrand from './pages/NewBrand';
import EditBrand from './pages/EditBrand';
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';
import SingleProduct from './pages/SingleProduct';
import EditProduct from './pages/EditProduct';
import About from './pages/About';

class RoutePaths extends Component{
  render(){
    return(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Connector}>
            <IndexRoute component={Brands}></IndexRoute>
            <Route path="/brand/new" component={NewBrand}></Route>
            <Route path="/brands" component={Brands}></Route>
            <Route path="/brands/:id" component={SingleBrand}></Route>
            <Route path="/brands/:id/edit" component={EditBrand}></Route>
            <Route path="/product/new" component={NewProduct}></Route>
            <Route path="/products" component={Products}></Route>
            <Route path="/products/:id" component={SingleProduct}></Route>
            <Route path="/products/:id/edit" component={EditProduct}></Route>
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
