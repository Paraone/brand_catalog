import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actionsCreator from '../actions/actionsCreator';
import App from './App';

function mapStateToProps(state){
	return {
    brands: state.brands,
    single: state.single,
    products: state.products
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionsCreator, dispatch);
}

const Connector = connect(mapStateToProps, mapDispatchToProps)(App);

export default Connector;
