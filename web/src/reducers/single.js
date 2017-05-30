function single(state = {}, action){
  let newstate;
  switch(action.type){
    case 'SINGLE_BRAND':
      newstate = Object.assign({}, state);
      newstate.products = action.products.data;
      newstate.brand = action.brand;
      newstate.loading = false;
      return newstate;
    case 'CREATE_PRODUCT':
      newstate = Object.assign({}, state);
      newstate.products.push(action.product.data);
      return newstate
    case 'EDIT_PRODUCT':
      newstate = Object.assign({}, state);
      console.log("action.product", action.product);
      const product = newstate.products.filter(p => p.id === Number(action.product.data.id))[0];
      console.log("product", product);
      newstate.products[newstate.products.indexOf(product)] = action.product.data;
      return newstate
    case 'DELETE_PRODUCT':
      newstate = Object.assign({}, state);
      newstate.products = [
        ...state.products.slice(0, state.products.indexOf(action.product)),
        ...state.products.slice(state.products.indexOf(action.product)+1)
      ]
      return newstate;
    default:
      return state;
  }
}

export default single;
